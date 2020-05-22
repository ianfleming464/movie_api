import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { RouterLink } from "react-router-dom";

import "./update-view.scss";

export function UpdateView(props) {
  const { user } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleUpdate = e => {
    e.preventDefault();
    axios
      .put(
        `https://my1980smoviesapi.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
        {
          // Correct path?
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        }
      )
      .then(response => {
        // Assign the result to the state
        const updatedData = response.data;
        alert("Updated!");
        console.log(updatedData);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        alert("Error!");
        console.log("Error!");
      });
  };

  return (
    <div className="update-view justify-content-center">
      <Row className="justify-content-center">
        <Col>
          <Container className="container update-container border border-light rounded py-3 px-3">
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Control type="text" placeholder="New Username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="New Email" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Control type="text" placeholder="New birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
              <Row className="justify-content-end">
                <Button className="update-btn mr-3" variant="primary" type="submit" onClick={handleUpdate}>
                  Update
                </Button>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <Button variant="link" type="submit" className="unregister-btn">
                Delete account
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
