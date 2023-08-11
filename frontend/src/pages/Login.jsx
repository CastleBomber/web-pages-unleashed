import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/Dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="login">
        <nav>
          <NavigationBar className="navbar" />
        </nav>

        <main>
          <div className="ms-5">
            <h1 className="mt-5 mb-3">
              <FaSignInAlt className="sign-in-symbol me-2" />
              Login
            </h1>
            <h2>Login and start setting goals</h2>
          </div>

          <Form className="mt-3" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label size="lg">Email address</Form.Label>
              <Form.Control
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={onChange}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                size="lg"
              />
            </Form.Group>

            <div className="register-button">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </main>

        <footer className="mt-5">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Login;
