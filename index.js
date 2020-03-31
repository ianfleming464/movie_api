const express = require("express"),
  morgan = require("morgan"),
  app = express();

let topMovies = [
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
    genre: "Action/Horror",
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

// Logging -

app.use(morgan("common"));

// app.disable('etag'); This disables caching and prevents the
// 304 HTTP error code I received originally. However, it would
// increase the load for any visitors.

// GET requests

// Returns a JSON object of the topMovies variable
app.get("/movies", function(req, res) {
  res.json(topMovies);
});

// Returns plain text
app.get("/", function(req, res) {
  res.send("Welcome to my 1980s movie API.");
});

// Accesses the public directory
app.use(express.static("public"));

// Error handling funciton. How to test?!
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
