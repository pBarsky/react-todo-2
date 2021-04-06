import { Alert, Container } from 'react-bootstrap'
import Todos from '../../components/Todos/Todos'
import TaskInput from '../../components/Forms/TaskInput/TaskInput'
import { useEffect, useState } from 'react'
import { useDb } from '../../contexts/dbContext'
import { useAuth } from '../../contexts/authContext'
import { Link } from 'react-router-dom'

const Todolist = () => {
  const [tasks, setTasks] = useState({})
  const [taskInputValue, setTaskInputValue] = useState('')
  const [canAdd, setCanAdd] = useState(false)
  const [error, setError] = useState(null)
  const [infoRegister, setInfoRegister] = useState(true)
  const { createAsync, removeAsync, getAllAsync } = useDb()
  const { currentUser } = useAuth()

  const onTaskInputHandler = ({ target }) => {
    setTaskInputValue(target.value)
    setCanAdd(validate(target.value))
  }

  useEffect(() => {
    getAllAsync().then(fetchedTasks => {
      if (fetchedTasks) { setTasks(fetchedTasks) }
    }).catch(() => {
      setError('Could not retrieve data from server.')
    })
  }, [])

  const validate = (input) => {
    return input !== ''
  }

  const onAddTaskClickHandler = async (event) => {
    event.preventDefault()
    const id = await createAsync({ name: taskInputValue, done: false })
    if (!id) {
      setError('Cannot create new task on the server.')
      return
    }
    setTasks((oldTasks) => ({
      ...oldTasks,
      [id]: { name: taskInputValue, done: false }
    }))
    setTaskInputValue('')
    setCanAdd(false)
  }

  const enqueueToDeletion = (id) => {
    setTimeout(() => {
      if (tasks[id]) {
        onTaskDeleteHandler(id)
      }
    }, 300)
  }

  const onTaskDeleteHandler = async (id) => {
    setError()
    const removed = await removeAsync(id)
    if (!removed) {
      setError('Cannot remove task on the server.')
      return
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

  return (
    <Container className="flex justify-content-center mx-5">
      {!currentUser && infoRegister && <Alert dismissible onClose={() => setInfoRegister(false)} variant="info"><Alert.Heading>Attention</Alert.Heading>If you want to save your tasks, please <Link to="/signup"><strong>sign in</strong></Link>.</Alert>}
      <TaskInput
        changed={onTaskInputHandler}
        submit={onAddTaskClickHandler}
        taskName={taskInputValue}
        disabled={!canAdd}
      />
      {error && <Alert variant="danger" onClose={() => setError()} dismissible><Alert.Heading>Error</Alert.Heading>{error}</Alert>}
      <Todos
        tasks={tasks}
        onTaskChecked={onTaskDoneHandler}
        onTaskDeleted={onTaskDeleteHandler}
      />
    </Container>
  )
}

export default Todolist
