import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

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
        <Navbar.Brand href="/">Web Pages Unleashed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="link" href="/Dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link className="link" href="/PageRed">
              Red
            </Nav.Link>

            <Nav.Link className="link" href="/PageBlue">
              Blue
            </Nav.Link>

            <Nav.Link className="link" href="/GoalsPage">
              Goals
            </Nav.Link>

            {user ? (
              <Nav.Link className="link" href="/" onClick={onLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </Nav.Link>
            ) : (
              <>
                <li>
                  <Nav.Link className="link" href="/Login">
                    <FaSignInAlt className="me-2" />
                    Login
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className="link" href="/Register">
                    <FaUser className="me-2" />
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
