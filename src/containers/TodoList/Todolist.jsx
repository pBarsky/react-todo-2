import { Component } from "react";
import { Container } from "react-bootstrap";
import Todos from "../../components/Todos/Todos";
import TaskInput from "../../components/UI/Forms/TaskInput/TaskInput";
import { v1 as uuidv1 } from "uuid";

export default class Todolist extends Component {
  state = {
    tasks: {},
    taskInputValue: "",
    canAdd: false,
  };

  onTaskInputHandler = ({ target }) => {
    this.setState({ taskInputValue: target.value });
    this.setState({ canAdd: this.validate(target.value) });
  };

  validate = (input) => {
    return input !== "";
  };

  onAddTaskClickHandler = (event) => {
    event.preventDefault();
    const updatedTasks = { ...this.state.tasks };
    const id = uuidv1();
    updatedTasks[id] = {
      name: this.state.taskInputValue,
      done: false,
      id: id,
    };
    this.setState({
      tasks: updatedTasks,
      taskInputValue: "",
      canAdd: false,
    });
  };

  enqueueToDeletion = (id) => {
    setTimeout(() => {
      if (this.state.tasks[id] && this.state.tasks[id].done) {
        this.onTaskDeleteHandler(id);
      }
    }, 3000);
  };

  onTaskDeleteHandler = (id, done) => {
    const updatedTasks = Object.entries(this.state.tasks).filter(
      ([key, val]) => {
        return val.id !== id;
      }
    );
    this.setState({ tasks: Object.fromEntries(updatedTasks) });
  };

  onTaskDoneHandler = ({ target }, id) => {
    const tasks = { ...this.state.tasks };
    tasks[id].done = !tasks[id].done;
    this.setState({ tasks: tasks });
    this.enqueueToDeletion(id);
  };

  render() {
    return (
      <Container style={{ margin: "5vh auto" }}>
        <TaskInput
          changed={this.onTaskInputHandler}
          submit={this.onAddTaskClickHandler}
          taskName={this.state.taskInputValue}
          disabled={!this.state.canAdd}
        />
        <Todos
          tasks={this.state.tasks}
          onTaskChecked={this.onTaskDoneHandler}
          onTaskDeleted={this.onTaskDeleteHandler}
        />
      </Container>
    );
  }
}
