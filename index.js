const express = require('express'),
    morgan = require('morgan'),
    app = express();

// The first 10 movies I could think of that I enjoy. That aren't
// children's movies.

let topMovies = [{
    title: 'Life is Beautiful',
    year: '1997'
},
{
    title: 'Goodfellas',
    year: '1990'
},
{
    title: 'Predator',
    year: '1987'
},
{
    title: 'Blade Runner',
    year: '1982'
},
{
    title: 'Aliens',
    year: '1986'
},
{
    title: 'Children of Men',
    year: '2006'
},
{
    title: '28 Days Later',
    year: '2002'
},
{
    title: 'Trainspotting',
    year: '1996'
},
{
    title: 'Purple Rain',
    year: '1984'
},
{
    title: 'The Abyss',
    year: '1989'
}
]

// Logging - 

app.use(morgan('common'));

// app.disable('etag'); This disables caching and prevents the 
// 304 HTTP error code I received originally. However, it would 
// increase the load for any visitors.

// GET requests

// Returns a JSON object of the topMovies variable
app.get('/movies', function (req, res) {
    res.json(topMovies)
})

// Returns plain text
app.get('/', function (req, res) {
    res.send('Welcome to my movie API.');
});

// Accesses the public directory
app.use(express.static('public'));

// Error handling funciton. How to test?!
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () =>
    console.log('Your app is listening on port 8080.')
);
