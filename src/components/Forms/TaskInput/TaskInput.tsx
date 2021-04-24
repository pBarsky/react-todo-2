import { Button, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDb } from '../../../contexts/dbContext'

interface Props {
  addTodo(id: string, taskInputValue: string): void,

  setError(message: string): void,
}

const TaskInput = ({ addTodo, setError }: Props) => {
  const [canAdd, setCanAdd] = useState(false)
  const [taskInputValue, setTaskInputValue] = useState('')
  const { createAsync } = useDb()

  const validate = (input: string) => {
    return input !== ''
  }

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement | HTMLElement>) => {
    event.preventDefault()
    try {
      const id = await createAsync({ name: taskInputValue, done: false, id: '' })
      addTodo(id, taskInputValue)
    } catch (e) {
      setError(e.message)
    }
    setTaskInputValue('')
    setCanAdd(false)
  }

  const onTaskInputHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
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
        <OverlayTrigger placement="bottom" defaultShow={true}
                        overlay={<Tooltip id="dateInputTooltip">Currently disabled</Tooltip>}>
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

export default TaskInput
