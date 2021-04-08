import { CardColumns } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Todo from './Todo/Todo'

const Todos = ({ onTaskChecked, onTaskDeleted, tasks, onSelectTask }) => {
  return (
    <CardColumns>
      {Object.keys(tasks).map((key, idx) => {
        const { name, done } = tasks[key]
        const id = key
        return (
          <Todo
            key={idx}
            name={name}
            done={done}
            id={id}
            onTaskChecked={(event) => onTaskChecked(event, id)}
            onTaskDeleted={(_) => onTaskDeleted(id)}
            onTaskSelect={onSelectTask}
          />
        )
      })}
    </CardColumns>
  )
}

Todos.propTypes = {
  tasks: PropTypes.object.isRequired
}

Todos.defaultProps = {
  tasks: []
}

export default Todos
