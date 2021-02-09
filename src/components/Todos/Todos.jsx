import { ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Todo from './Todo/Todo'

const Todos = (props) => {
  return (
    <ListGroup variant="flush">
      {Object.keys(props.tasks).map((key, idx) => {
        const { name, done } = props.tasks[key]
        const id = key
        return (
          <Todo
            key={idx}
            name={name}
            done={done}
            id={id}
            onTaskChecked={(event) => props.onTaskChecked(event, id)}
            onTaskDeleted={(event) => props.onTaskDeleted(id)}
          />
        )
      })}
    </ListGroup>
  )
}

Todos.propTypes = {
  tasks: PropTypes.object.isRequired
}

Todos.defaultProps = {
  tasks: []
}

export default Todos
