import PropTypes from 'prop-types'
import { Button, Card, Form } from 'react-bootstrap'

import styles from './Todo.module.css'
import { X } from 'react-bootstrap-icons'

const Todo = ({ done, id, name, onTaskChecked, onTaskDeleted, onTaskSelect }) => {
  return (
    <Card>
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
            done ? [styles.crossedOut, 'text-muted'].join(' ') : null
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
          className="flex-grow-1"
        >
          <strong>Edit</strong>
        </Button>
        <Button
          size="sm"
          className="ml-4 w-25"
          variant="danger"
          onClick={onTaskDeleted}
        >
          {<X style={{ fontSize: '2rem' }}/>}
        </Button>
      </Card.Footer>
    </Card>
  )
}
Todo.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onTaskChecked: PropTypes.func.isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}
export default Todo
