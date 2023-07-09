import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
              Red
            </Nav.Link>

            <Nav.Link className="link" href="/PageBlue">
              Blue
            </Nav.Link>

            <Nav.Link className="link" href="/PageGreen">
              Green
            </Nav.Link>

            {user ? (
              <Nav.Link className="link" href="/" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </Nav.Link>
            ) : (
              <>
                <li>
                  <Nav.Link className="link" href="/Login">
                    <FaSignInAlt />
                    Login
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className="link" href="/Register">
                    <FaUser />
                    Register
                  </Nav.Link>
                </li>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
