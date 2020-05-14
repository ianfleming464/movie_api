import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState(""); // Array destructuring - first item is current value, second is a function that lets us update it
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault(); //
    axios
      .post("https://my1980smoviesapi.herokuapp.com/login", {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("No such user!");
      });
  };

  return (
    <Container className="login-container">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button className="button-login" variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Button variant="link" type="submit" onClick={() => props.onClick()}>
          Sign up!
        </Button>
      </Form>
    </Container>
  );
}
