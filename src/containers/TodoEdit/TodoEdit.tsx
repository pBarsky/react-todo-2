import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { Todo } from '../../models/todo'

interface Props {
  selectedTodo: Todo;
  onExit: () => void;
  handleTaskUpdate: (id: string, todo: Todo) => Promise<void>
}

const TodoEdit = ({ selectedTodo, onExit, handleTaskUpdate }: Props) => {
  const [show, setShow] = useState(true)
  const [currentTodo, setCurrentTodo] = useState<Todo>({ ...selectedTodo })

  const handleEdit = ({ target: { value: inputValue, name, checked } }: any) => {
    const value = name === 'done' ? checked : inputValue
    setCurrentTodo(currentTodo => ({ ...currentTodo, [name]: value }))
  }

  const handleClose = () => {
    onExit()
    setShow(false)
  }

  const save = () => {
    handleTaskUpdate(currentTodo.id, currentTodo).then()
    onExit()
    setShow(false)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    save()
  }

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Your task name." value={currentTodo.name ?? ''}
                          onChange={handleEdit}/>
          </Form.Group>

          <Form.Group controlId="formDoneCheckbox">
            <Form.Check name="done" type="checkbox" checked={currentTodo.done ?? false} label="Done"
                        onChange={handleEdit}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={save}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TodoEdit
