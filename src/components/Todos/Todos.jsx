import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import Todo from "./Todo/Todo";

const Todos = (props) => {
  return (
    <ListGroup variant="flush">
      {Object.keys(props.tasks).map((key, idx) => {
        const task = props.tasks[key];
        return (
          <Todo
            key={idx}
            name={task.name}
            done={task.done}
            id={task.id}
            onTaskChecked={(event) => props.onTaskChecked(event, task.id)}
            onTaskDeleted={(event) => props.onTaskDeleted(task.id)}
          />
        );
      })}
    </ListGroup>
  );
};

Todos.propTypes = {
  tasks: PropTypes.object.isRequired,
};

Todos.defaultProps = {
  tasks: [],
};

export default Todos;
