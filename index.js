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
const Models = require("./models.js");

const Movies = Models.Movie;

const Users = Models.User;

// Connect locally:
mongoose.connect("mongodb://localhost:27017/WaxOnWaxOffDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect API with online database:
// mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
 * Endpoint: /movies
 * GET request
 * @method getMovies
 * @param {string} endpoint - API endpoint
 * @param {function} authorisation - Bearer token
 * @example Request:
 *   getMovies(token) {
 *   axios
 *     .get("https://my1980smoviesapi.herokuapp.com/movies", {
 *       headers: { Authorization: `Bearer ${token}` }
 *     })
 *     .then(response => {
 *       this.props.setMovies(response.data);
 *     })
 *     .catch(function(error) {
 *       console.log(error);
 *     });
 * }
 * @example Response: JSON file, data of all movies:
 *[
 *   {
 *       "Genre": {
 *           "Name": "Comedy",
 *           "Description": "A comedy film is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception)"
 *       },
 *       "Director": {
 *           "Name": "Jim Abrahams",
 *           "Born": "May 10, 1944",
 *           "Biography": "Jim Abrahams was born on May 10, 1944 in Shorewood, Wisconsin, USA, and is the son of an educational researcher and a lawyer. He attended Shorewood High School. He has a home in Eagle River, Wisconsin where he has spent summers since he was a child.  He is best known for the spoof movies that he co-wrote and produced with brothers Jerry Zucker and David Zucker, such as Airplane! (for which he was nominated for a BAFTA Award for Best Screenplay) and The Naked Gun series. The team of Zucker, Abrahams and Zucker (also referred to as \"ZAZ\") really began when the three men grew up together in Milwaukee, Wisconsin. He directed movies on his own, such as Big Business, and further honed his skills in parody with Hot Shots! and its 1993 sequel, Hot Shots! Part Deux.  Abrahams and his wife, Nancy (née Cocuzzo) co-founded The Charlie Foundation To Help Cure Pediatric Epilepsy. "
 *       },
 *       "Actors": [],
 *       "_id": "5e8e31cca8f8ed3e8b4a2740",
 *       "Title": "Airplane!",
 *       "Description": "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
 *       "ImagePath": "https://image.tmdb.org/t/p/original/zOiB3p2WTTiwCFgTMnXuDGgzbTN.jpg",
 *       "Year": "1980",
 *       "Featured": false
 *   },
 * {
 *       "Genre": {
 *           "Name": "Adventure",
 *           "Description": "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way. Main plot elements include quests for lost continents and exotic setting; struggles and situations that confront the main characters, the creation of empires, characters embarking on treasure and heroic journeys, travels, explorations, quests and searches for the unknown usually also having to overcome an adversary."
 *       },
 *       "Director": {
 *           "Name": "Rob Reiner",
 *           "Born": "March 6, 1947",
 *           "Biography": "Robert Reiner was born in New York City, to Estelle Reiner (née Lebost) and Emmy-winning actor, comedian, writer, and producer Carl Reiner.  As a child, he often looked up to his father as his inspiration and role-model. Carl Reiner was on The Dick Van Dyke Show, which he created and also starred in.   When Rob graduated high school, his parents advised him to participate in Summer Theatre. Reiner got a job as an apprentice in the Bucks County Playhouse in Pennsylvania. He went to be further educated at UCLA Film School. Reiner felt he still wasn't successful even having a recurring role on one of the biggest shows in the country, All in the Family. Reiner began his directing career with the Oscar-nominated films This Is Spinal Tap, Stand By Me, and The Princess Bride,.  With these successful box-office movies in 1987, Reiner founded his own production company, Castle Rock Entertainment, along with Martin Shafer, Andrew Scheinman, Glenn Padnick, and Alan Horn. For Castle Rock Entertainment, he went to direct the Oscar-nominated films When Harry Met Sally, Misery, and A Few Good Men. Reiner often credits former co-star Carroll O'Connor in helping him get into the directing business, and showing Reiner the ropes.  Reiner also is known as a political activist, co-founding the American Foundation For Equal Rights, a group that was an advisory for same-sex-marriage. Reiner has spoken at several rallies on several controversial topics, and is also seen as an advocate on social issues, such as domestic violence and tobacco use."
 *       },
 *       "Actors": [],
 *       "_id": "5e8e3859a8f8ed3e8b4a2744",
 *       "Title": "The Princess Bride",
 *       "Description": "Adapted by William Goldman from his 1973 novel The Princess Bride, it tells the story of a farmhand named Westley, accompanied by companions befriended along the way, who must rescue his true love Princess Buttercup from the odious Prince Humperdinck.",
 *       "ImagePath": "https://image.tmdb.org/t/p/original/dvjqlp2sAhUeFjUOfQDgqwpphHj.jpg",
 *       "Year": "1987",
 *       "Featured": false
 *   }, etc.
 */


// passport.authenticate("jwt", { session: false }

app.get("/movies"), (req, res) => {
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
 * @example Response: JSON file with movie information:
 *   {
 *       "Genre": {
 *           "Name": "Comedy",
 *           "Description": "A comedy film is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception)"
 *       },
 *       "Director": {
 *           "Name": "Jim Abrahams",
 *           "Born": "May 10, 1944",
 *           "Biography": "Jim Abrahams was born on May 10, 1944 in Shorewood, Wisconsin, USA, and is the son of an educational researcher and a lawyer. He attended Shorewood High School. He has a home in Eagle River, Wisconsin where he has spent summers since he was a child.  He is best known for the spoof movies that he co-wrote and produced with brothers Jerry Zucker and David Zucker, such as Airplane! (for which he was nominated for a BAFTA Award for Best Screenplay) and The Naked Gun series. The team of Zucker, Abrahams and Zucker (also referred to as \"ZAZ\") really began when the three men grew up together in Milwaukee, Wisconsin. He directed movies on his own, such as Big Business, and further honed his skills in parody with Hot Shots! and its 1993 sequel, Hot Shots! Part Deux.  Abrahams and his wife, Nancy (née Cocuzzo) co-founded The Charlie Foundation To Help Cure Pediatric Epilepsy. "
 *       },
 *       "Actors": [],
 *       "_id": "5e8e31cca8f8ed3e8b4a2740",
 *       "Title": "Airplane!",
 *       "Description": "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
 *       "ImagePath": "https://image.tmdb.org/t/p/original/zOiB3p2WTTiwCFgTMnXuDGgzbTN.jpg",
 *       "Year": "1980",
 *       "Featured": false
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
 * @function GET /movies/genres/:Name
 * @param Name {string} - genre name
 * @example Response: JSON file with genre information:
 *       "Genre": {
 *           "Name": "Comedy",
 *           "Description": "A comedy film is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception)"
 *       },
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
 * @example  Response:
 *[Username] was deleted.
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
