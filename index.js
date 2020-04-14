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

// Returns a JSON object of the movies variable

app.get("/movies", (req, res) => {
  res.json(movies);
});

// Returns data about single movie by title

app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request for obtaining movie by title!");
});

// Return data about a genre by name

app.get("/genres/:name", (req, res) => {
  res.send("Successful GET request for obtaining genre data!");
});

// Return director info

app.get("/directors/:name", (req, res) => {
  res.send("Succesful GET request for returning director info!");
});

// Allow new users to register

// OLD in memory array  function:
// app.post("/users", (req, res) => {
//   let newUser = req.body;

//   if (!newUser.username) {
//     const message = "Missing username in request body";
//     res.status(400).send(message);
//   } else {
//     res.send("User successfully added.");
//   }
// });

//---------------------------------------------
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

// -----------------------------------------------
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

// Allow users to update user info

app.put("/users/:username/:password/:email/:dateOfBirth", (req, res) => {
  res.send("Successful PUT request for updating user info");
});

// Allow users to add a movie to a list of favourites

app.post("/users/:username/favourites", (req, res) => {
  res.send("Successful POST request adding a movie to a list of favourites");
}); // note to self: apply some sort of filter() functionality to give error message if the film year is not from the 1980s

// Allow users to remove a movie from a list of favourites

app.delete("/users/:username/favourites", (req, res) => {
  res.send(
    "Successful DELETE request removing a movie to a list of favourites"
  );
});

// Allow existing users to deregister

app.delete("/users/:username", (req, res) => {
  res.send("Succesful DELETE of existing user");
});

// Error handling

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There has been an error.");
});

// Listen for requests
app.listen(27017, () => console.log("Your app is listening on port 27017."));
