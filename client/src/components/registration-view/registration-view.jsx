import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./registration-view.scss";
import axios from "axios";

export function RegistrationView(props) {
  const [username, createUsername] = useState(""); // Array destructuring - first item is current value, second is a function that lets us update it
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegister = e => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    alert("Success!");
    props.onSignedIn(username);
  };
  // axios
  //   .post("https://my1980smoviesapi.herokuapp.com/users", {
  //     // Correct path?
  //     Username: username,
  //     Password: password,
  //     Email: email,
  //     Birthday: birthday
  //   })
  //   .then(response => {
  //     // Assign the result to the state
  //     const data = response.data;
  //     alert("Success!");
  //     console.log(data);
  //     window.open("/client", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
  //   })
  //   .catch(e => {
  //     alert("Error!");
  //     console.log("Error!");

  return (
    <Container className="registration-container">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => createUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => createPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Email" value={email} onChange={e => createEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthday">
          <Form.Control type="text" placeholder="eg. 1981-07-13" value={birthday} onChange={e => createBirthday(e.target.value)} />
        </Form.Group>

        <Button className="button-register" variant="primary" type="submit" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Container>
  );
}
