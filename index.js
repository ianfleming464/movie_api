const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const { check, validationResult } = require("express-validator");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// importing mongoose schemas
/** @requires models.js, contains the data schema for this application */
const Models = require("./models.js");

/** @const Movies data schema for Movies object  */
const Movies = Models.Movie;

/** @const Users data schema for Users object  */
const Users = Models.User;

// Connect locally:
// mongoose.connect("mongodb://localhost:27017/WaxOnWaxOffDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// Not showing up in JSDocs - not really necessary?
/**
 * @class Router
 * @description Index.js manages all HTTP requests
 * @requires express, a server framework for Node.js
 * @requires body-parser, a parsing middleware for node.js that is needed to read HTTP POST data which is stored in req.body
 * @requires uuid, which generates user ids
 * @requires validator, Express middleware that provide validators sanitizer functions
 * @requires cors, Express middleware that manages the CORS settings (Cross-Origin-Resource-Sharing)
 * @const app encapsulate express functionality
 * @requires morgan, logger middleware function
 * @requires mongoose, an object data modeling library (ODM) for MongoDB database
 * @requires path, part of Node.js core, manages file and folder paths
 */

// Connect API with online database:
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// adding CORS - task requires from all origins (default)

app.use(cors());

// let allowedOrigins = ["http://localhost:1234', 'http://testsite.com"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         let message = "The CORS policy for this application doesn't allow access from origin " + origin;
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     }
//   })
// );

// adding bodyParser -

app.use(bodyParser.json());

// Importing auth.js

let auth = require("./auth")(app);

// Importing passport
/** @requires passport, authentication middleware for Node.js */
const passport = require("passport");
require("./passport");

// Logging -

app.use(morgan("common"));

// Accesses the public directory -

app.use(express.static("public"));

app.use("/client", express.static(path.join(__dirname, "client", "dist")));

app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Endpoints

// Returns plain text

app.get("/", function(req, res) {
  res.send("Welcome to my 1980s movie API.");
});

/**
 * Returns a list of ALL movies to the user
 * @function GET /movies
 * @example response: JSON file, data of all movies:
 *[
 *   {
 *     "Genre": {
 *       "Name": " ",
 *       "Description": " "
 *     },
 *     "Director": {
 *       "Name": " ",
 *       "Born": " ",
 *       "Biography": " "
 *     },
 *     "_id": "",
 *     "Title": "",
 *     "Description": ".",
 *     "ImagePath": "",
 *     "Year": " ",
 *     "Featured": ""
 *   },
 *]
 */
app.get("/movies", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * Returns data about a single movie by title
 * @function GET /movies/:Title
 * @param title {string} - movie title
 * @example requests:
 * @example response: JSON file with movie information:
 *   {
 *     "Genre": {
 *       "Name": " ",
 *       "Description": " "
 *     }
 *     "Director": {
 *       "Name": " ",
 *       "Born": " ",
 *       "Biography": " "
 *     },
 *     "_id": "",
 *     "Title": "",
 *     "Description": ".",
 *     "ImagePath": "",
 *     "Year": " ",
 *     "Featured": ""
 *   },
 */

app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.status(201).json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * Returns genre description by name
 *
 * @function GET /movies/genres/:Name
 * @param Name {string} - genre name
 * @example response: JSON file with genre information:
 *   {
 *     "Genre": {
 *       "Name": " ",
 *       "Description": " "
 *     }
 */

app.get("/movies/genres/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(movie => {
      res.status(201).json(movie.Genre);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
* Returns director information by name
  /**
  * @function GET /movies/directors/:Name
  * @param Name {string} name - director's name
  * @example JSON file with director info:
  *{
  *   "Name": " ",
  *   "Born": " ",
  *   "Died": " ",
  *   "Biography": " ",
  * }
*/

app.get("/movies/directors/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(movie => {
      res.status(201).json(movie.Director);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
* Add new user (i.e. Registration)
  /**
  * @function POST /users
  * @example request body format JSON file:
  *{
  *   "Username": "",
  *   "Password": "",
  *   "Email": "",
  *   "Birthday": "",
  * }
*/

app.post(
  "/users",
  // Validation logic here for request
  [
    check("Username", "Username must contain a minimum of 5 characters.").isLength({ min: 5 }),
    check("Username", "Username must not contain non-alphanumeric characters.").isAlphanumeric(),
    check("Password", "Password is required.")
      .not()
      .isEmpty(),
    check("Email", "Invalid Email address.").isEmail()
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if user with requested username exists
      .then(user => {
        if (user) {
          // if user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists.");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.error(error);
              res.status(500).send("Error " + error);
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
* UPDATE info of a specific user
  /**
  * @function PUT /users/:Username
  * @param username {string} username - username
  * @example request body format JSON file:
  *{
  *   "Username": "",
  *   "Password": "",
  *   "Email": "",
  *   "Birthday": "",
  * }
  */

app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username must contain a minimum of 5 characters.").isLength({ min: 5 }),
    check("Username", "Username must not contain non-alphanumeric characters.").isAlphanumeric(),
    check("Password", "Password is required.")
      .not()
      .isEmpty(),
    check("Email", "Invalid Email address.").isEmail()
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username, // req.body means that the updated info is extracted from the body of the request sent
          Password: hashedPassword, // by the user.
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }, // This line ensures the updated document is returned.
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
* UPDATE/add movie to favourites list
  /**
  * @function PUT /users/:Username/Movies/:MovieID
  * @param username {string} username - username
  * @param id {string} id - user's id
  * @example JSON file:
  *{
  *   "FavouriteMovies": [],
  *   "_id": "",
  *   "Username": "",
  *   "Password": "",
  *   "Email": "",
  *   "Birthday": "",
  *   "__v": 0
  * }
  */

app.post("/users/:Username/Movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavouriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

/**
 *  DELETE movie from favourites list
 * @function DELETE /users/:Username/Movies/:MovieID
 * @param Username {string} username
 * @param id {string} id - movie id
 */
app.delete("/users/:Username/Movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavouriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

/**
 * DELETE a user by username
 * @function DELETE /users/:Username
 * @param Username {string} username
 * @example  response:
 *[Username] was deleted.'
 */

app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET all users

app.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET user by username

app.get("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Listen for requests
const port = process.env.PORT || 27017;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
