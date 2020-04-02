const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

const morgan = require("morgan");

// Data arrays

let movies = [
  {
    title: "Ferris Bueller's Day Off",
    description:
      "A high school wise guy is determined to have a day off from school, despite what the Principal thinks of that.",
    genre: "Comedy",
    director: {
      name: "John Hughes",
      born: "February 18, 1950"
    },
    image: "/public/ferrisbueller.png",
    year: "1986"
  },
  {
    title: "Airplane!",
    description:
      "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
    genre: "Comedy",
    director: {
      name: "Jim Abrahams",
      born: "May 10, 1944"
    },
    image: "/public/airplane.png",
    year: "1980"
  },
  {
    title: "Predator",
    description:
      "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
    genre: "Science fiction",
    director: {
      name: "John McTiernan",
      Born: "January 8, 1951"
    },
    image: "/public/predator.png",
    year: "1987"
  },
  {
    title: "Blade Runner",
    description:
      "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
    genre: "Science fiction",
    director: {
      name: "Ridley Scott",
      born: "November 30, 1937"
    },
    image: "/public/bladerunner.png",
    year: "1982"
  },
  {
    title: "Aliens",
    description:
      "Ellen Ripley is rescued by a deep salvage team after being in hypersleep for 57 years. The moon that the Nostromo visited has been colonized, but contact is lost. This time, colonial marines have impressive firepower, but will that be enough?",
    genre: "Science fiction",
    director: {
      name: "James Cameron",
      born: "August 16, 1954"
    },
    image: "/public/aliens.png",
    year: "1986"
  },

  {
    title: "The Princess Bride",
    description:
      "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    genre: "Adventure",
    director: {
      name: "Rob Reiner",
      born: "March 6, 1947"
    },
    image: "/public/princessbride.png",
    year: "1987"
  },
  {
    title: "Back to the Future",
    description:
      "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    genre: "Adventure",
    director: {
      name: "Robert Zemeckis",
      born: "May 14, 1951"
    },
    image: "/public/backtothefuture.png",
    year: "1985"
  },
  {
    title: "Beverly Hills Cop",
    description:
      "A freewheeling Detroit cop pursuing a murder investigation finds himself dealing with the very different culture of Beverly Hills.",
    genre: "Comedy",
    director: {
      name: "Martin Brest",
      born: "August 8, 1951"
    },
    image: "/public/beverleyhillscop.png",
    year: "1984"
  },
  {
    title: "Purple Rain",
    description:
      "A young musician, tormented by an abusive situation at home, must contend with a rival singer, a burgeoning romance, and his own dissatisfied band, as his star begins to rise.",
    genre: "Drama",
    director: {
      name: "Albert Magnoli",
      born: "January 31, 1954"
    },
    image: "/public/purplerain.png",
    year: "1984"
  },
  {
    title: "Twins",
    description:
      "A physically perfect but innocent man goes in search of his long-lost twin brother, who is short, a womanizer, and small-time crook.",
    genre: "Comedy",
    director: {
      name: "Ivan Reitman",
      born: "October 27, 1946"
    },
    image: "/public/twins.png",
    year: "1988"
  }
];

// let directors = [
//   {
//     name: "John Hughes",
//     born: "February 18, 1950"
//   },
//   {
//     name: "Jim Abrahams",
//     born: "May 10, 1944"
//   },
//   {
//     name: "John McTiernan",
//     born: "January 8, 1951"
//   },
//   {
//     name: "Ridley Scott",
//     born: "November 30, 1937"
//   },
//   {
//     name: "James Cameron",
//     born: "August 16, 1954"
//   },
//   {
//     name: "Rob Reiner",
//     born: "March 6, 1947"
//   },
//   {
//     name: "Robert Zemeckis",
//     born: "May 14, 1951"
//   },
//   {
//     name: "Martin Brest",
//     born: "August 8, 1951"
//   },
//   {
//     name: "Albert Magnoli",
//     born: "January 31, 1954"
//   },
//   {
//     name: "Ivan Reitman",
//     born: "October 27, 1946"
//   }
// ];

// let genres = [
//   {
//     name: "Comedy",
//     description:
//       "A comedy film is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception)."
//   },
//   {
//     name: "Science fiction",
//     description:
//       "Science fiction (or sci-fi) is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
//   },
//   {
//     name: "Adventure",
//     description:
//       "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way. Main plot elements include quests for lost continents and exotic setting; struggles and situations that confront the main characters, the creation of empires, characters embarking on treasure and heroic journeys, travels, explorations, quests and searches for the unknown usually also having to overcome an adversary."
//   },
//   {
//     name: "Drama",
//     description:
//       "Drama is a genre of narrative fiction intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular subgenre. These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods."
//   }
// ];

// MIDDLEWARE

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
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

// app.get("/movies/:title", (req, res) => {
//   res.send("Successful GET request for obtaining movie by title!");
// });

// Return data about a genre by name

app.get("/genres/:name", (req, res) => {
  res.send("Successful GET request for obtaining genre data!");
});

// Return director info

app.get("/directors/:name", (req, res) => {
  res.send("Succesful GET request for returning director info!");
});

// Allow new users to register

app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message);
  } else {
    res.send("User successfully added.");
  }
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
app.listen(8080, () => console.log("Your app is listening on port 8080."));
