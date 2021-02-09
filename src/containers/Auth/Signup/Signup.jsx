import { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()

    // TODO: change placeholder validation

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to create an account.')
    }
    setLoading(false)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center mt-3">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign up</h2>
            {loading && (
              <div className="text-center mb-4">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  ref={emailRef}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordRef}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordConfirmRef}
                  disabled={loading}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
      {!loading && currentUser && <Redirect to="/" />}
    </Container>
  )
}

export default Signup
