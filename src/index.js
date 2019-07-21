import React from "react";
import ReactDOM from "react-dom";

import GameContainer from "./containers/gameContainer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <GameContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
