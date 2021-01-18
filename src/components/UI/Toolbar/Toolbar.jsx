import { Nav, Navbar } from "react-bootstrap";

const Toolbar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">TBA</Nav.Link>
        <Nav.Link href="#features">TBA</Nav.Link>
        <Nav.Link href="#pricing">TBA</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Toolbar;
