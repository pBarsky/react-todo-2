import { Switch, Route } from "react-router-dom";
import Toolbar from "../../components/Toolbar/Toolbar";
import TodoList from "../TodoList/Todolist";
import Signup from "../Auth/Signup/Signup";
import { Container } from "react-bootstrap";
import Login from "../Auth/Login/Login";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Logout from "../Auth/Logout/Logout";
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
