import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Redirect } from "react-router-dom";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

const Logout = () => {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logout();
    } catch {
      setError("Failed to log out.");
    }
    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-3">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Button disabled={loading} className="w-100" type="submit">
                Log out
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      {!loading && !currentUser && <Redirect to="/login" />}
    </Container>
  );
};

export default Logout;