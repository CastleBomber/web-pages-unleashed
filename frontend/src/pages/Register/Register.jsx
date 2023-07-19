import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../../features/auth/authSlice";
import NavigationBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
      navigate("/");
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="register">
        <nav>
          <NavigationBar className="navbar" />
        </nav>

        <main>
          <h1 className="mt-5 mb-3">
            <FaUser className="sign-in-symbol me-2" />
            Register
          </h1>
          <h2>Please create an account</h2>

          <Form className="mt-3" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label size="lg">Name</Form.Label>
              <Form.Control
                name="name"
                id="name"
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={onChange}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label size="lg">Email address</Form.Label>
              <Form.Control
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="password2"
                id="password2"
                type="password2"
                placeholder="Confirm your password"
                value={password2}
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

export default Register;
