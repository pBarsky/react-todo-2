import { Form, Col, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const TaskInput = (props) => {
  return (
    <Form style={{ margin: "3vh auto" }} onSubmit={props.submit}>
      <Row>
        <Col>
          <Form.Control
            value={props.taskName}
            onChange={props.changed}
            placeholder="Add your task here :)"
          />
        </Col>
        <Col xs="auto">
          <Button disabled={props.disabled} onClick={props.submit}>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

TaskInput.propTypes = {
  taskName: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default TaskInput;
