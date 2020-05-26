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
      users: [],
      user: null
      // register: false
      // newUser: false
    };
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

  // getAllUsers(token) {
  //   axios
  //     .get("https://my1980smoviesapi.herokuapp.com/users", {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(response => {
  //       this.setState({
  //         users: response.data
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      // this.getAllUsers(accessToken);
    }
  }

  onLoggedIn(authData) {
    //Updates state when user has logged in
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    // localStorage.setItem("password", authData.user.Password);
    // localStorage.setItem("email", authData.user.Email);
    // localStorage.setItem("birthday", authData.user.Birthday);
    // localStorage.setItem("favourites", authData.user.FavouriteMovies);
    this.getMovies(authData.token);
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem("email");
    // localStorage.removeItem("birthday");
    // localStorage.removeItem("password");
    // localStorage.removeItem("favorites");
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }

  handleRegistration() {
    this.setState({
      newUser: true
    });
  }

  alreadyRegistered() {
    this.setState({
      newUser: false
    });
  }

  render() {
    const { movies, user, users } = this.state;

    console.log(user);

    // if (!user && !newUser) return <LoginView onClick={() => this.handleRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;

    // if (newUser) return <RegistrationView onClick={() => this.alreadyRegistered()} onLoggedIn={user => this.onLoggedIn(user)} />;

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
                  <Route path="/register" render={() => <RegistrationView onClick />} />
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
              <Link component={RouterLink} to={`/users/${user}`}>
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
                <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
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
                  render={({ match }) => <ProfileView user={users.find(user => user.Username === match.params.Username)} movies={movies} />}
                />
                <Route exact path="/users/:username/update" render={({ match }) => <UpdateView user={user} />} />
              </Row>
            </Container>
          </div>
        </Router>
      );
    }
  }
}
