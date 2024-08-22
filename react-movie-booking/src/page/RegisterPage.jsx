import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { axiosConfig } from "../axios.config";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(axiosConfig.baseURL + "/auth/register", register)
      .then(() => {
        console.log("Registration successful");
        alert("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }

  return (
    <Container className="custom-login-position">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <img src="/company-logo.svg" alt="" />
        <h1>Eclipse Cinemas</h1>
        <h5>REGISTER</h5>
        <FloatingLabel
          controlId="floatingUsername"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={(e) => handleChange(e)}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            required
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}
