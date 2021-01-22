import Toolbar from "../Toolbar/Toolbar";
import TodoList from "../../../containers/TodoList/Todolist";
import Signup from "../../../containers/Auth/Signup/Signup";
import { Container } from "react-bootstrap";

const Layout = () => {
  return (
    <div>
      <Toolbar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup />
        </div>
      </Container>
      {/* <TodoList /> */}
    </div>
  );
};

export default Layout;
