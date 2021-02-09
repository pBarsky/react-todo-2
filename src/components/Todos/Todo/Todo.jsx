import PropTypes from 'prop-types'
import { Form, ListGroupItem, Button } from 'react-bootstrap'

import styles from './Todo.module.css'

const Todo = (props) => {
  return (
    <ListGroupItem className={styles.Todo}>
      <Form.Check
        inline
        type="checkbox"
        custom
        id={`taskDone${props.id}`}
        onChange={props.onTaskChecked}
        checked={props.done}
      />
      <span
        className={
          props.done ? [styles.crossedOut, 'text-muted'].join(' ') : null
        }
      >
        {props.name}
      </span>
      <Button
        size="sm"
        className={styles.DeleteButton}
        variant="outline-danger"
        onClick={props.onTaskDeleted}
      >
        X
      </Button>
    </ListGroupItem>
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
