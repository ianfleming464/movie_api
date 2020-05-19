import React from "react";
import "./genre-view.scss";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    console.log(this.props);

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <h4> Genre : {genre.Name}</h4>
            <p> Description : {genre.Description}</p>
          </Media.Body>
        </Media>
        <Link to={`/`}>
          <Button className="back-from-genre" variant="primary">
            Back to movie list
          </Button>
        </Link>
      </div>
    );
  }
}
