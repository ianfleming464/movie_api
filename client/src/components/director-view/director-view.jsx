import React from "react";
import "./director-view.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;
    console.log(director);

    if (!director) return null;

    return (
      <div className="director-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <h4>{director.Name}</h4>
            <h6>
              {director.Born} - {director.Died}
            </h6>
            <p>{director.Biography}</p>
          </Media.Body>
        </Media>
        <Link to={`/`}>
          <Button className="back-from-director" variant="primary">
            Back to movie list
          </Button>
        </Link>
      </div>
    );
  }
}
