const express = require('express'),
    morgan = require('morgan');

const app = express();


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

// Get requests

app.get('/', function (req, res) {
    res.send('Welcome to my movie API.');
});
app.get("/documentation", function (req, res) {
    res.sendFile("public/documentation.html", { root: __dirname });
});
app.get('/movies', function (req, res) {
    res.json(topMovies)
});

// Listen for requests
app.listen(8080, () =>
    console.log('Your app is listening on port 8080.')
);
