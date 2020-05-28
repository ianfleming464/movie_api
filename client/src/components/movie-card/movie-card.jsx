import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favourites: []
    };
  }

  addFavourite() {
    const movieId = this.props.value;
    console.log(movieId);
    // Sets favourite to state on click, but only 1 item --->
    // this.setState(prevState => ({
    //   favourites: [...prevState.favourites, movieId]
    // }));
    const url = `http://my1980smoviesapi.herokuapp.com/users/`;
    const user = localStorage.getItem("user");
    const plusMovie = `${url}${user}/Movies/${movieId}`;
    axios
      .post(
        plusMovie,
        { Username: user },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(event => {
        console.log("Cannot add movie to list");
      });

    let favourites = localStorage.setItem("favourites", this.movieId);
    console.log(favourites);
  }

  render() {
    const { movie } = this.props;
    // console.log(this.props.value);

    return (
      <Card className="card-container box-shadow" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Header className="card-header text-center font-weight-bold">{movie.Title}</Card.Header>
        <Card.Body className="card-body d-flex flex-column">
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Footer className="card-footer">
            <Link to={`/movies/${movie._id}`}>
              <Button size="sm" className="button-open float-left" variant="link">
                Open
              </Button>
            </Link>
            <Button size="sm" className="button-favourites sm float-right" variant="link" onClick={() => this.addFavourite()}>
              Favourite
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}
