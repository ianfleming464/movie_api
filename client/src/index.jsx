import React from "react";
import ReactDOM from "react-dom";

//Import statement to indicate that you need to bundle `./index.scss`

import "./index.scss";

// Main component (will eventually use all the others)

class My1980sMoviesAPI extends React.Component {
  render() {
    return (
      <div className="my-1980s">
        <div>Good morning</div>
      </div>
    );
  }
}

// Finds the root of the app

const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element

ReactDOM.render(React.createElement(My1980sMoviesAPI), container);
