import { Switch, Route } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import TodoList from "../../../containers/TodoList/Todolist";
import Signup from "../../../containers/Auth/Signup/Signup";
import { Container } from "react-bootstrap";
import Login from "../../../containers/Auth/Login/Login";
import ForgotPassword from "../../../containers/Auth/ForgotPassword/ForgotPassword";
import Logout from "../../../containers/Auth/Logout/Logout";
const Layout = () => {
  return (
    <>
      <Toolbar />
      <Container className="d-flex justify-content-center">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/" exact component={TodoList} />
        </Switch>
      </Container>
    </>
  );
};

export default Layout;
