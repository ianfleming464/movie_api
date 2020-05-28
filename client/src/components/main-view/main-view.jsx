import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { RouterLink } from "react-router-dom";
import "./main-view.scss";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      userData: null,
      _id: null,
      register: false,
      favouriteMovies: []
      // newUser: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
        userData: localStorage.getItem("userData")
      });
      this.getMovies(accessToken);
    }
  }

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

  addToFavourites = movieId => {
    const username = localStorage.getItem("user");

    axios
      .post(`https://cors-anywhere.herokuapp.com/https://my1980smoviesapi.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        let movies = response.data;

        movies.forEach(movie => {
          if (movie._id === movieId) {
            this.setState(prevState => ({
              favourites: prevState.favorites.concat(movie)
            }));
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onLoggedIn(authData) {
    //Updates state when user has logged in
    this.setState({
      user: authData.user.Username,
      userData: authData.user.userData,
      userId: authData.user._id
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    localStorage.setItem("userId", authData.user._id);
    localStorage.setItem("userData", JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  handleLogout() {
    localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // localStorage.removeItem("userData");
    // localStorage.removeItem("email");
    // localStorage.removeItem("birthday");
    this.setState({
      movies: [],
      user: null,
      userData: null,
      _id: null,
      register: false,
      favouriteMovies: []
    });
    window.open("/", "_self");
  }

  // handleRegistration() {
  //   this.setState({
  //     newUser: true
  //   });
  // }

  // alreadyRegistered() {
  //   this.setState({
  //     newUser: false
  //   });
  // }

  render() {
    const { movies, user } = this.state;

    console.log(user);

    if (!movies) return <div className="main-view" />;

    if (!user) {
      return (
        <Router>
          <div className="main-view">
            <Container>
              <Row className="justify-content-center">
                <Col>
                  <Route exact path="/" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />} />
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col>
                  <Route path="/register" render={() => <RegistrationView />} />
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar sticky="top" bg="light" expand="lg" className="main-navbar mb-3 shadow-sm p-3 mb-5">
            <Navbar.Brand href="#" className="navbar-brand">
              My 1980s Movie API
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Link to={`/users/${user}`}>
                <Button
                  variant="primary ml-1"
                  size="sm"
                  className="profile-button"
                  onClick={() => {
                    return <ProfileView />;
                  }}
                >
                  Profile
                </Button>
              </Link>
              <Button variant="primary ml-1" size="sm" className="logout-button" onClick={() => this.handleLogout()}>
                Log out
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <div className="main-view">
            <Container>
              <Row>
                <Route
                  exact
                  path="/"
                  render={() =>
                    movies.map(m => <MovieCard key={m._id} movie={m} addFavourites={movieId => this.addToFavourites(movieId)} />)
                  }
                />
                <Route
                  path="/movies/:movieId"
                  render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />}
                />
                <Route
                  exact
                  path="/directors/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} />;
                  }}
                />
                <Route
                  exact
                  path="/genres/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />;
                  }}
                />
                <Route
                  exact
                  path="/users/:username"
                  render={() => {
                    return <ProfileView user={user} id={localStorage.getItem("userId")} />;
                  }}
                />
                <Route exact path="/users/:username/update" render={() => <UpdateView user={user} id={localStorage.getItem("userId")} />} />
              </Row>
            </Container>
          </div>
        </Router>
      );
    }
  }
}
// /users/:username/update
