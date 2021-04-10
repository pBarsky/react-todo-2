import { Button, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDb } from '../../../contexts/dbContext'

const TaskInput = ({ addTodo, setError }) => {
  const [canAdd, setCanAdd] = useState(false)
  const [taskInputValue, setTaskInputValue] = useState('')
  const { createAsync } = useDb()

  const validate = (input) => {
    return input !== ''
  }

  const onSubmitHandler = async (event) => {
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

  const onTaskInputHandler = ({ target }) => {
    setTaskInputValue(target.value)
    setCanAdd(validate(target.value))
  }

  return (
    <Form style={{ margin: '3vh auto' }} onSubmit={onSubmitHandler}>
      <InputGroup>
        <Form.Control
          className="w-50"
          value={taskInputValue}
          onChange={onTaskInputHandler}
          placeholder="Add your task here :)"
        />
        <OverlayTrigger placement="bottom" defaultShow={true} overlay={<Tooltip id="dateInputTooltip">Currently disabled</Tooltip>}>
          {({ ref, ...triggerHandler }) => (<Form.Control
            {...triggerHandler}
            ref={ref}
            type="date"
            className="rounded-right"
            disabled
          />)}
        </OverlayTrigger>
        <Button className="ml-4" disabled={!canAdd} onClick={onSubmitHandler}>
          Add
        </Button>
      </InputGroup>
    </Form>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default TaskInput
