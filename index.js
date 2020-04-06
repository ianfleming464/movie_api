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
      born: "February 18, 1950",
      died: "August 6, 2009"
    },
    image: "https://www.imdb.com/title/tt0091042/mediaviewer/rm4100659200",
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
    image: "https://www.imdb.com/title/tt0080339/mediaviewer/rm1610833408",
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
    image: "https://www.imdb.com/title/tt0093773/mediaviewer/rm35588864",
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
    image: "https://www.imdb.com/title/tt0083658/mediaviewer/rm3676975360",
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
    image: "https://www.imdb.com/title/tt0090605/mediaviewer/rm490960896",
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
    image: "https://www.imdb.com/title/tt0093779/mediaviewer/rm2230196992",
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
    image: "https://www.imdb.com/title/tt0088763/mediaviewer/rm554638848",
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
    image: "https://www.imdb.com/title/tt0086960/mediaviewer/rm1574835200",
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
    image: "https://www.imdb.com/title/tt0087957/mediaviewer/rm2949198592",
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
    image: "https://www.imdb.com/title/tt0096320/mediaviewer/rm2320435968",
    year: "1988"
  },
  {
    title: "The Terminator",
    description:
      "In 1984, a human soldier is tasked to stop an indestructible cyborg killing machine, both sent from 2029, from executing a young woman, whose unborn son is the key to humanity's future salvation.",
    genre: "Science fiction",
    director: {
      name: "James Cameron",
      born: "August 16, 1954"
    },
    image: "https://www.imdb.com/title/tt0088247/mediaviewer/rm774208512",
    year: "1984"
  },
  {
    title: "Planes, Trains and Automobiles",
    description:
      "A man must struggle to travel home for Thanksgiving with a lovable oaf of a shower curtain ring salesman as his only companion.",
    genre: "Comedy",
    director: {
      name: "John Hughes",
      born: "February 18, 1950",
      died: "August 6, 2009"
    },
    image: "https://www.imdb.com/title/tt0093748/mediaviewer/rm1855067136",
    year: "1987"
  },
  {
    title: "The Breakfast Club",
    description:
      "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
    genre: "Drama",
    director: {
      name: "John Hughes",
      born: "February 18, 1950",
      died: "August 6, 2009"
    },
    image: "https://www.imdb.com/title/tt0088847/mediaviewer/rm2988051200",
    year: "1985"
  },
  {
    title: "Rambo: First Blood Part II",
    description:
      "Rambo returns to the jungles of Vietnam on a mission to infiltrate an enemy base-camp and rescue the American POWs still held captive there.",
    genre: "Action",
    director: {
      name: "James Cameron",
      born: "August 16, 1954"
    },
    image: "https://www.imdb.com/title/tt0089880/mediaviewer/rm2029328128",
    year: "1985"
  },
  {
    title: "The Naked Gun",
    description:
      "Incompetent police Detective Frank Drebin must foil an attempt to assassinate Queen Elizabeth II.",
    genre: "Comedy",
    director: {
      name: "Jim Abrahams",
      born: "May 10, 1944"
    },
    image: "https://www.imdb.com/title/tt0095705/mediaviewer/rm2877822976",
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
