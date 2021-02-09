import { Button, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../../contexts/authContext'

const Toolbar = () => {
  const { currentUser } = useAuth()

  const authAction = !currentUser
    ? (
    <LinkContainer to="/signup">
      <Nav.Link>
        <Button variant="outline-primary">Register</Button>
      </Nav.Link>
    </LinkContainer>
      )
    : (
    <LinkContainer to="/logout">
      <Nav.Link>
        <Button variant="outline-primary">Logout</Button>
      </Nav.Link>
    </LinkContainer>
      )
  const navBar = (
    <>
      {currentUser && (
        <LinkContainer to="/profile">
          <>
            <Navbar.Text>Hello,</Navbar.Text>
            <Nav.Link>{currentUser.email}</Nav.Link>
          </>
        </LinkContainer>
      )}
      {authAction}
    </>
  )
  return (
    <Navbar bg="light" variant="light">
      <LinkContainer to="/">
        <Navbar.Brand href="/">Logo</Navbar.Brand>
      </LinkContainer>
      <Nav className="ml-auto flex align-items-center">{navBar}</Nav>
    </Navbar>
  )
}

export default Toolbar
