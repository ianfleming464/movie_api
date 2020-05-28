import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
  }

  // addToFavourites = e => {
  //   e.preventDefault();
  //   const url = `https://my1980smoviesapi.herokuapp.com/users/`;
  //   const user = localStorage.getItem("user");
  //   const addMovie = `${url}${user}/movies/${movie._id}`;

  //   let favArr = localStorage.getItem("favourites");
  //   console.log(favArr);

  //   let favourites = favArr ? JSON.parse(favArr) : [];

  //   axios
  //     .post(
  //       addMovie,
  //       {
  //         Username: user
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       }
  //     )
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(event => {
  //       console.log("error adding favourite!");
  //     });

  //   favourites.concat(movie._id);

  //   setFav([...favArray, movie._id]);

  //   localStorage.setItem("favourites", JSON.stringify(favourites));
  // };

  render() {
    const { movie } = this.props;

    return (
      <Card className="card-container box-shadow" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Header className="card-header text-center font-weight-bold">{movie.Title}</Card.Header>
        <Card.Body className="card-body d-flex flex-column">
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button-open" variant="link">
              Open
            </Button>
          </Link>
          {/* <Card.Footer className="card-footer">
            {!this.state.clicked ? (
              <Button variant="link" onClick={this.addToFavourites}>
                Add to Favourites
              </Button>
            ) : (
              <p>Added to Favourites</p>
            )}
          </Card.Footer> */}
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};

// Check why buttons out of place now
