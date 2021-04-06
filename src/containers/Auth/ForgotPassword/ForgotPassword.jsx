import { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'

const ForgotPassword = () => {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to send password reset email.')
    }
    setLoading(false)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center mt-3">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef}/>
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Reset password
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/login">Log in</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </Container>
  )
}

export default ForgotPassword
