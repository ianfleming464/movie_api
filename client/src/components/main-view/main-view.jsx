import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Button from "react-bootstrap/Button";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: false,
      register: false,
      newUser: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  // These are methods which can be passed as props!

  getMovies(token) {
    axios
      .get("https://my1980smoviesapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    //Updates state when user has logged in
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  onRegistration() {
    this.setState({
      newUser: true
    });
  }

  alreadyRegistered() {
    this.setState({
      newUser: false
    });
  }

  // onSignedIn(user) {
  //   this.setState({
  //     user: user
  //   });
  // }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && !newUser) return <LoginView onClick={() => this.onRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (newUser) return <RegistrationView onClick={() => this.alreadyRegistered()} />;

    //Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Button className="button-logout" onClick={() => this.handleLogout()}>
          Log out
        </Button>
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)} />
            ) : (
              movies.map(movie => <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />)
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
