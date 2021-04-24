import { Alert, Container } from 'react-bootstrap'
import TodoCards from '../../components/Todos/TodoCards'
import TaskInput from '../../components/Forms/TaskInput/TaskInput'
import React, { useEffect, useState } from 'react'
import { useDb } from '../../contexts/dbContext'
import { useAuth } from '../../contexts/authContext'
import { Link } from 'react-router-dom'
import TodoEdit from '../TodoEdit/TodoEdit'
import { Todo } from '../../models/todo'

const Todolist = () => {
  const [tasks, setTasks] = useState<Record<string, Todo>>({})
  const [error, setError] = useState<string>('')
  const [infoRegister, setInfoRegister] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null)
  const [editing, setEditing] = useState(false)
  const { removeAsync, updateAsync, getAllAsync } = useDb()
  const { currentUser } = useAuth()

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

  const addTodo = (id: string, name: string) => {
    setTasks((oldTasks) => ({
      ...oldTasks,
      [id]: { name: name, done: false, id: id }
    }))
  }

  const updateTodo = (id: string, todo: Todo) => {
    setTasks(oldTasks => ({ ...oldTasks, [id]: { ...todo } }))
  }

  const handleTaskUpdate = async (id: string, todo: Todo) => {
    updateTodo(id, todo)
    try {
      await updateAsync(id, todo)
    } catch (e) {
      setError(e.message)
    }
  }

  const onTaskDeleteHandler = async (id: string) => {
    setError('')
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

  const enqueueToDeletion = (id: string) => {
    setTimeout(() => {
      if (tasks[id]) {
        return onTaskDeleteHandler(id)
      }
    }, 1000)
  }

  const onTaskDoneHandler = (e: React.ChangeEvent<HTMLInputElement> | undefined, id: string) => {
    setTasks((old) => ({ ...old, [id]: { ...old[id], done: true } }))
    enqueueToDeletion(id)
  }

  const handleTaskSelect = (id: string) => {
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
    <Container className="flex justify-content-center col-sm-12 col-lg-10">
      {!currentUser && infoRegister &&
      <Alert dismissible onClose={() => setInfoRegister(false)} variant="info"><Alert.Heading>Attention</Alert.Heading>If
        you want to save your tasks, please <Link to="/signup"><strong>sign in</strong></Link>.</Alert>}
      <TaskInput
        addTodo={addTodo}
        setError={setError}
      />
      {error &&
      <Alert variant="danger" onClose={() => setError('')} dismissible><Alert.Heading>Error</Alert.Heading>{error}
      </Alert>}
      <TodoCards
        tasks={tasks}
        onTaskChecked={onTaskDoneHandler}
        onTaskDeleted={onTaskDeleteHandler}
        onSelectTask={handleTaskSelect}
      />
      {editing && selectedTask &&
      <TodoEdit selectedTodo={selectedTask} handleTaskUpdate={handleTaskUpdate} onExit={handleCloseEditForm}/>}
    </Container>
  )
}

export default Todolist
