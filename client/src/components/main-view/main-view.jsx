import React from "react";
import axios from "axios";

export class MainView extends React.Component {
  // One of the hooks available in a React component
  componentDidMount() {
    axios
      .get("https://my1980smoviesapi.herokuapp.com/movies")
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    // If the state isn't initialzed, this will throw on runtime
    const { movies } = this.state;
    //Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>
            {movie.Title}
          </div>
        ))}
      </div>
    );
  }
}
