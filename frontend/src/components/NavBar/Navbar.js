import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./navbar.css";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Web Pages Unleashed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="link" href="/">
              Home
            </Nav.Link>

            <Nav.Link className="link" href="/PageRed">
              PageRed
            </Nav.Link>

            <Nav.Link className="link" href="/PageBlue">
              PageBlue
            </Nav.Link>

            <Nav.Link className="link" href="/PageGreen">
              PageGreen
            </Nav.Link>

            <Nav.Link className="link" href="/Login">
              <FaSignInAlt />
              Login
            </Nav.Link>

            <Nav.Link className="link" href="/Register">
              <FaUser />
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
