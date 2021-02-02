import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../../contexts/authContext";

const Toolbar = () => {
  const { currentUser } = useAuth();

  const logout = !currentUser ? (
    <LinkContainer to="/signup">
      <Nav.Link>Register</Nav.Link>
    </LinkContainer>
  ) : (
    <LinkContainer to="/logout">
      <Nav.Link>Logout</Nav.Link>
    </LinkContainer>
  );

  return (
    <Navbar bg="light" variant="light">
      <LinkContainer to="/">
        <Navbar.Brand href="/">Logo</Navbar.Brand>
      </LinkContainer>
      <Nav className="ml-auto">{logout}</Nav>
    </Navbar>
  );
};

export default Toolbar;
