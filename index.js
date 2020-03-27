const express = require('express'),
    morgan = require('morgan'),
    app = express();

let topMovies = [{
    title: 'Ferris Bueller\'s Day Off',
    year: '1986'
},
{
    title: 'Airplane!',
    year: '1980'
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
    title: 'The Princess Bride',
    year: '1987'
},
{
    title: 'Back to the Future',
    year: '1985'
},
{
    title: 'Beverly Hills Cop',
    year: '1984'
},
{
    title: 'Purple Rain',
    year: '1984'
},
{
    title: 'Twins',
    year: '1988'
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
    res.send('Welcome to my 1980s movie API.');
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
