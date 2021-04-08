import { Button, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'

const TodoEdit = ({ selectedTodo, onExit, handleTaskUpdate }) => {
  const [show, setShow] = useState(true)
  const [currentTodo, setCurrentTodo] = useState({ ...selectedTodo } ?? { name: '', done: false })

  const handleEdit = ({ target: { value: inputValue, name, checked } }) => {
    const value = name === 'done' ? checked : inputValue
    setCurrentTodo(currentTodo => ({ ...currentTodo, [name]: value }))
  }

  const handleClose = () => {
    onExit()
    setShow(false)
  }

  const save = () => {
    handleTaskUpdate(currentTodo.id, currentTodo)
    onExit()
    setShow(false)
  }

  const submit = (e) => {
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
            <Form.Check name="done" type="checkbox" value={currentTodo.done ?? false} label="Done"
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
