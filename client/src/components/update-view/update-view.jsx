import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./update-view.scss";

export function UpdateView(props) {
  const { user, userId } = props;
  // console.log(props);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const userURL = `https://my1980smoviesapi.herokuapp.com/users/${username}`;
  const requestBody = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  };

  const handleUpdate = e => {
    e.preventDefault();
    console.log(requestBody);
    axios
      .put(userURL, requestBody, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })

      .then(res => {
        // Assign the result to the state
        const data = res.data;

        // localStorage.setItem("user", data.Username);
        // localStorage.setItem("password", data.Password);
        // localStorage.setItem("email", data.Email);
        // localStorage.setItem("birthday", data.Birthday);
        // console.log(this.props);
        console.log(res);
        // alert("Updated!");
        // localStorage.setItem("user", data.Username);
        // console.log(data);
        // window.open(`/users/${localStorage.getItem("user")}`);
      })
      .catch(e => {
        alert("Error!");
        console.log(e);
      });
  };

  const handleDelete = e => {
    axios
      .delete(`https://my1980smoviesapi.herokuapp.com/movies/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        alert("Do you really want to delete your account?");
      })
      .then(res => {
        alert("Account was successfully deleted");
      })
      .then(res => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        this.setState({
          user: null
        });
        window.open("/", "_self");
      })
      .catch(e => {
        alert(e);
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
              <Button variant="link" type="submit" className="unregister-btn" onClick={handleDelete}>
                Delete account
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
