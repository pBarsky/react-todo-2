import { Alert, Container } from 'react-bootstrap'
import Todos from '../../components/Todos/Todos'
import TaskInput from '../../components/Forms/TaskInput/TaskInput'
import { useEffect, useState } from 'react'
import { useDb } from '../../contexts/dbContext'
import { useAuth } from '../../contexts/authContext'
import { Link } from 'react-router-dom'
import TodoEdit from '../TodoEdit/TodoEdit'

const Todolist = () => {
  const [tasks, setTasks] = useState({})
  const [taskInputValue, setTaskInputValue] = useState('')
  const [canAdd, setCanAdd] = useState(false)
  const [error, setError] = useState(null)
  const [infoRegister, setInfoRegister] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editing, setEditing] = useState(false)
  const { createAsync, removeAsync, updateAsync, getAllAsync } = useDb()
  const { currentUser } = useAuth()

  const onTaskInputHandler = ({ target }) => {
    setTaskInputValue(target.value)
    setCanAdd(validate(target.value))
  }

  useEffect(() => {
    try {
      getAllAsync().then(fetchedTasks => {
        if (fetchedTasks) {
          setTasks(fetchedTasks)
        }
      }).catch(() => {
        setError('Could not retrieve data from server.')
      })
    } catch (e) {
      setError(e.message)
    }
  }, [])

  const validate = (input) => {
    return input !== ''
  }

  const addTodo = (id, name) => {
    setTasks((oldTasks) => ({
      ...oldTasks,
      [id]: { name: name, done: false, id: id }
    }))
  }

  const updateTodo = (id, todo) => {
    setTasks(oldTasks => ({ ...oldTasks, [id]: { ...todo } }))
  }

  const handleTaskUpdate = async (id, todo) => {
    updateTodo(id, todo)
    try {
      await updateAsync(id, todo)
    } catch (e) {
      setError(e.message)
    }
  }

  const onAddTaskClickHandler = async (event) => {
    event.preventDefault()
    try {
      const id = await createAsync({ name: taskInputValue, done: false })
      addTodo(id, taskInputValue)
    } catch (e) {
      setError(e.message)
    }
    setTaskInputValue('')
    setCanAdd(false)
  }

  const enqueueToDeletion = (id) => {
    setTimeout(() => {
      if (tasks[id]) {
        return onTaskDeleteHandler(id)
      }
    }, 1000)
  }

  const onTaskDeleteHandler = async (id) => {
    setError(null)
    try {
      await removeAsync(id)
    } catch (e) {
      setError(e.message)
    }
    const updatedTasks = Object.entries(tasks).filter(([key, _]) => {
      return key !== id
    })
    setTasks(Object.fromEntries(updatedTasks))
  }

  const onTaskDoneHandler = (e, id) => {
    setTasks((old) => ({ ...old, [id]: { ...old[id], done: true } }))
    enqueueToDeletion(id)
  }

  const handleTaskSelect = (id) => {
    const task = tasks[id]
    if (!task) {
      throw new Error('Selected task does not exist')
    }
    setSelectedTask(task)
    setEditing(true)
  }

  const handleCloseEditForm = () => {
    setEditing(false)
  }

  return (
    <Container className="flex justify-content-center mx-5">
      {!currentUser && infoRegister &&
      <Alert dismissible onClose={() => setInfoRegister(false)} variant="info"><Alert.Heading>Attention</Alert.Heading>If
        you want to save your tasks, please <Link to="/signup"><strong>sign in</strong></Link>.</Alert>}
      <TaskInput
        changed={onTaskInputHandler}
        submit={onAddTaskClickHandler}
        taskName={taskInputValue}
        disabled={!canAdd}
      />
      {error &&
      <Alert variant="danger" onClose={() => setError()} dismissible><Alert.Heading>Error</Alert.Heading>{error}
      </Alert>}
      <Todos
        tasks={tasks}
        onTaskChecked={onTaskDoneHandler}
        onTaskDeleted={onTaskDeleteHandler}
        onSelectTask={handleTaskSelect}
      />
      {editing &&
      <TodoEdit selectedTodo={selectedTask} handleTaskUpdate={handleTaskUpdate} onExit={handleCloseEditForm}/>}
    </Container>
  )
}

export default Todolist
