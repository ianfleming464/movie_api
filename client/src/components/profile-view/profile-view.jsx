import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
          Birthday: res.data.Birthday ? res.data.Birthday.substr(0, 10) : " ",
          FavouriteMovies: res.data.FavouriteMovies
        });
        console.log(res.data.FavouriteMovies);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // filterList = () => {
  //   let favouritesList = movies.filter(m => this.state.FavouriteMovies.includes(m._id));
  //   console.log(favouritesList);
  // };

  render() {
    const { movies } = this.props;
    console.log(this.state);
    console.log(this.props);

    return (
      <div className="profile-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <h2>{this.state.Username}'s Profile</h2>
            <h4>Username: {this.state.Username}</h4>
            <h4>Email: {this.state.Email}</h4>
            <h4>Birthday: {this.state.Birthday}</h4>
            <h4>Favourite Movies:</h4>
            <div className="d-flex row mt-3 ml-1">
              {movies.map(movie => {
                // if (movie._id === this.FavouriteMovies)
                return (
                  <div key={movie._id}>
                    <Card className="profile-view-card box-shadow" style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Header className="favourite-card-title-link text-center font-weight-bold">{movie.Title}</Card.Header>
                      </Link>
                      <Card.Body>
                        <Card.Text>{movie.Description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Media.Body>
        </Media>
      </div>
    );
  }
}
