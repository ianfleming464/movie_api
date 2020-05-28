import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      // username: this.Username
      // password: null,
      // email: null,
      // birthday: null,
      // favoriteMovies: [],
      // movies: []
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
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday.substr(0, 10),
          FavouriteMovies: res.data.FavouriteMovies
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // Delete user here - axios link to

  render() {
    const { user, id } = this.props;
    console.log(this.state);
    console.log(this.props);

    return (
      <div>
        <Container>
          <h1> {this.state.Username}'s Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>Username: {this.state.Username}</ListGroup.Item>
                <ListGroup.Item>Email: {this.state.Email}</ListGroup.Item>
                <ListGroup.Item>Birthday: {this.state.Birthday}</ListGroup.Item>
                <ListGroup.Item>Favourites: {this.state.FavouriteMovies}</ListGroup.Item>
              </ListGroup>
              <br />
              <br />
              {/* // link match backend link?! */}
              <Link to={`/users/${user}/update`}>
                <Button variant="primary">Update Profile</Button>
                <br />
                <br />
              </Link>
              <Link to={"/"}>Back</Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
