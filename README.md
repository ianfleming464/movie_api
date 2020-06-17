# My 1980s Movies API

This project was built as part of the Career Foundry's Full Stack Immersion programme. Specifically it was built using the MERN stack 
in order to showcase my ability to complete entire full-stack projects from conecption to execution.

This README details both [client-side](#Client-side) and [server-side](#Server-side) parts of the application. 

The REST API itself is hosted on Heroku, and provides users with the ability to register for an account. Logged-in users can then access information about different movies, directors and genres. Movies from the 1980s, as you may have guessed :) Users can also update their personal information, and create a list of their favourite movies - more specifics to follow (check out [Features](#Features)). The API provides full CRUD functionality via HTTP methods, in order to retrieve and alter information on the database. 

## Project dependencies

    "axios": "^0.19.2",
    "bcrypt": "^4.0.1",
    "body-parser": "^1.19.0",
    "core-js": "^3.6.5",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-validator": "^6.4.0",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.15",
    "mongoose": "^5.9.11",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "react-redux": "^7.2.0",
    "react-router-dom": "^5.2.0",
    "redux": "^4.0.5",
    "uuid": "^7.0.3"

# Server-side

The server-side was built using Javascript, Node.js, Express and MongoDB. 

## Features

* Return a list of ALL movies to the user
* Return detailed info (description, genre, director, year, image URL) about a single movie by title to the user
* Return detailed info about a genre by name
* Return detailed info about a director 
* Allow new users to register
* Allow users to update their user info (Username, Password, Email, Birthday)
* Allow users to add a movie to a list of favourites
* Allow users to remove a movie from their list of favourites
* Allow existing users to deregister

## Endpoints

### Return list of all movies


**Endpoint:** /movies

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about all movies



### Return detailed info (description, genre, director, year, image URL) about a single movie by title to the user.


**Endpoint:** /movies/[Title]

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about a single movie.



### Return detailed info about a genre by name

**Endpoint:** /movies/genres/[Name]

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** A JSON object holding data about a single genre (name, description, examples).



### Return detailed info about a director 

**Endpoint:** /movies/directors/[Name]

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about a director (name, birth/death, biography, movies).



### Allow new users to register

**Endpoint:** /users

**HTTP Method:** POST

**Request body data format:** JSON object holding data about a user:

**Request Example:**
```
{     
        "Username": "Ianfleming",
        "Password": "placeholder",
        "Email": "ian@fleming.com",
        "Birthday": "1981-07-07"       
}
```

**Response body data format:** JSON object holding data about the user that was added, including an ID and a "Favourites" key.

**Response Example:**
```
{
    "Favorites": [],
    "_id": "5e91ef68dc83c566b26b07b1",
    "Username": "Ianfleming",
    "Password": "$2b$10$yLdpCBJOFrCgUsxe.b.BHO5XVpu3BaXwEDJKXKdZ3t0hU95Lg.AJ2",
    "Email": "ian@fleming.com",
    "Birthday": "1981-07-07T00:00:00.000Z",
    "__v": 0
}
```



### Allow users to update their user info (Username, Password, Email, Birthday)

**Endpoint:** /users/[Username]

**HTTP Method:** PUT

**Request body data format:** JSON object holding data to be updated:

**Request Example:**
```
{
    "Username": "Newianfleming",
    "Password": "newplaceholder",
    "Email": "newemail@gmail.com",
    "Birthday": "1981-08-08T00:00:00.000Z"    
}
```

**Response body data format:** JSON data holding updated user info.

**Response Example:**
```
{
    "Favorites": [
        "5e8e3c86a8f8ed3e8b4a2747",
        "5e8e37a3a8f8ed3e8b4a2742"
    ],
    "_id": "5e91ef68dc83c566b26b07b1",
    "Username": "Newianfleming",
    "Password": "$2b$10$zXxA/vh6CS.seIbJjfb91OOdlT1GJw/Y3us8RUCRhQpqzNKQoTQXK",
    "Email": "newemail@gmail.com",
    "Birthday": "1981-08-08T00:00:00.000Z"
}
```



### Allow users to add a movie to their list of favourites

**Endpoint:** /users/[Username]/Movies/[MovieID]

**HTTP Method:** POST

**Request body data format:** JSON object holding movie data, for example: 

``` { title: 'Red Heat', genre: 'action', director: 'Walter Hill', image URL: '****'', year: '1988' } ```

**Response body data format:** JSON object holding movie data that was added, including ID.



### Allow users to remove a movie from their list of favourites

**Endpoint:** /users/[Username]/Movies/[MovieID]

**HTTP Method:** DELETE

**Request body data format:** None

**Response body data format:** Text mesage indicating that the relevant movie was deleted.

### Allow existing users to deregister

**Endpoint:** /users/[Username]

**HTTP Method:** DELETE

**Request body data format:** None

**Response body data format:** A text message indicating whether the user account was successfully deleted.



# Client-side

The UI of My 1980s Movies API is built using React, with the various views handling data requested by the user through the above-identified [Endpoints](#Endpoints).

## Technical Details

* Single-page application
* Uses state-based routing for navigation
* Gives users option to filter movies via a search bar
* Written using React
* Uses React Redux
* Uses React Bootstrap as a UI library
* Contains a mix of class components and function components
* is hosted online

## Essential Views and Features

### Main view
* returns a list of all movies to the user (each listed item with image, title, description)
* sorting and filtering
* ability to select a movie for more details
* provides links to see profile data and to log out
* allows users to add a movie to their list of favorites

### Movie view
* returns data (description, genre, director, image) about a single movie to the user


### Login view
* allows users to login with username and password
* provides a link for new users registration view

### Registration view
* allows new users to sign in (username, password, email, birthday)

### Genre view
* returns data about a genre (name, description)
* displays example movies

### Director view
* returns data about a director (name, birth/death, biography)
* displays example movies

### Profile view
* allows users to see their profile data (username, email, birthday)
* displays favorite movies
* allows users to remove a movie from their list of favorites
* provides link to update viewt

### Update profile
* allows users to update their user info
* provides buttons to either update or delete existing account
