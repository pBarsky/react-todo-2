import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import styles from './Todo.module.css'
import { X } from 'react-bootstrap-icons'
import { Todo } from '../../../models/todo'

interface Props {
  Todo: Todo;
  onTaskChecked: (event: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  onTaskDeleted: (event: React.MouseEvent<HTMLElement> | undefined) => void
  onTaskSelect: (id: string) => void
}

const TodoCard = ({ Todo: { done, id, name }, onTaskChecked, onTaskDeleted, onTaskSelect }: Props) => {
  return (
    <Card style={{ minWidth: '170px' }}>
      <Card.Header>
        <Form.Check
          inline
          type="checkbox"
          custom
          id={`taskDone${id}`}
          onChange={onTaskChecked}
          checked={done}
          label="Done?"
        />
      </Card.Header>
      <Card.Body>
        <span
          className={
            done ? [styles.crossedOut, 'text-muted'].join(' ') : undefined
          }
        >
        {name}
      </span>
      </Card.Body>
      <Card.Footer className="d-flex">
        <Button
          size="sm"
          variant="info"
          onClick={() => onTaskSelect(id)}
          className="flex-grow-1 mr-3"
        >
          <strong>Edit</strong>
        </Button>
        <Button
          size="sm"
          className="w-25"
          variant="danger"
          onClick={onTaskDeleted}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {<X style={{ fontSize: '2rem' }}/>}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default TodoCard
