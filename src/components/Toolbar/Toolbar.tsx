import { Button, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../../contexts/authContext'
import { useLocation } from 'react-router-dom'

const Toolbar = () => {
  const { currentUser } = useAuth()
  const { pathname } = useLocation()

  const authActionButtonUrl = pathname === '/signup' ? '/login' : '/signup'
  const authActionButtonText = pathname === '/signup' ? 'Log in' : 'Sign up'

  const authAction = !currentUser
    ? (
      <LinkContainer to={authActionButtonUrl}>
        <Nav.Link>
          <Button variant="outline-primary" >{authActionButtonText}</Button>
        </Nav.Link>
      </LinkContainer>
      )
    : (
      <LinkContainer to="/logout">
        <Nav.Link>
          <Button variant="outline-primary">Log out</Button>
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

  const home = (
    pathname !== '/'
      ? <LinkContainer to="/">
        <Nav.Link className="text-dark">Home</Nav.Link>
      </LinkContainer>
      : <></>
  )

  return (
    <Navbar className="mb-4" bg="light" variant="light">
      <LinkContainer to="/">
        <Navbar.Brand href="/">Logo</Navbar.Brand>
      </LinkContainer>
      {home}
      <Nav className="ml-auto flex align-items-center">{navBar}</Nav>
    </Navbar>
  )
}

export default Toolbar
