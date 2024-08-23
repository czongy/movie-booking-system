import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { reCaptcha} from "../recaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import UserContext from "../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const { handleLoginUser } = useContext(UserContext);
  const [capVal, setCapVal] = useState(null);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const auth = btoa(`${login.username}:${login.password}`);
    axios
      .get(axiosConfig.baseURL + "/auth/login", {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        withCredentials: true
      })
      .then((response) => {
        handleLoginUser(response.data);
        alert("Login successful");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please try again.");
        setCapVal(null);
        recaptchaRef.current.reset()
      });
  }

  return (
    <Container className="custom-login-position" fluid>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <img src="/company-logo.svg" alt="" />
        <h1>Eclipse Cinemas</h1>
        <h5>LOGIN</h5>
        <FloatingLabel
          controlId="floatingInput"
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
        <ReCAPTCHA sitekey={reCaptcha.siteKey} onChange={val => setCapVal(val)} ref={recaptchaRef} />
        <Button className="mt-3" variant="primary" type="submit" disabled={!capVal}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
