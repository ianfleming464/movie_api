const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/WaxOnWaxOffDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// adding bodyParser -

app.use(bodyParser.json());

// Logging -

app.use(morgan("common"));

// Accesses the public directory -

app.use(express.static("public"));

// Endpoints

// Returns plain text

app.get("/", function(req, res) {
  res.send("Welcome to my 1980s movie API.");
});

// Return all movies

app.get("/movies", function(req, res) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Return data of a single movie

app.get("/movies/:Title", function(req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function(movie) {
      res.status(201).json(movie);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Return genre description by name

app.get("/movies/genres/:Name", function(req, res) {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(function(movie) {
      res.status(201).json(movie.Genre);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Return director info by name

app.get("/movies/directors/:Name", function(req, res) {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function(movie) {
      res.status(201).json(movie.Director);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add new user

app.post("/users", function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send("Error " + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// UPDATE info of a specific user

app.put("/users/:Username", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username, // req.body means that the updated info is extracted from the body of the request sent
        Password: req.body.Password, // by the user.
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line ensures the updated document is returned.
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// UPDATE/add movie to favourites list

app.post("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavouriteMovies: req.params.MovieID }
    },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// DELETE movie from favourites list

app.delete("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavouriteMovies: req.params.MovieID }
    },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// DELETE a user by username

app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET all users

app.get("/users", function(req, res) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET user by username

app.get("/users/:Username", function(req, res) {
  Users.findOne({ Username: req.params.Username })
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Listen for requests
app.listen(27017, () => console.log("Your app is listening on port 27017."));
