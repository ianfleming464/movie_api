import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: []
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`https://my1980smoviesapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(res => {
        this.setState({
          username: res.data.Username,
          password: res.data.Password,
          email: res.data.Email,
          birthday: res.data.Birthday,
          favourites: res.data.FavouriteMovies
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // Delete user here - axios link to

  render() {
    const { movies } = this.props;
    console.log(this.state);
    return (
      <div>
        <Container>
          <h1> {this.state.username}'s Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>Username: {this.state.username}</ListGroup.Item>
                <ListGroup.Item>Password:******* </ListGroup.Item>
                <ListGroup.Item>Email: {this.state.email}</ListGroup.Item>
                <ListGroup.Item>Birthday: {this.state.birthday}</ListGroup.Item>
                <ListGroup.Item>Favourites: {this.state.favourites}</ListGroup.Item>
              </ListGroup>
              <br />
              <br />
              <Link to={"/users/:Username/update"}>
                <Button variant="primary">Update Profile</Button>
                <br />
                <br />
              </Link>
              <Link to={`/`}>Back</Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
