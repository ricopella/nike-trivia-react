import React from "react";
import Card from "../components/card";

const Welcome = ({ setGameStatus }) => (
  <Card>
    <div>Welcome to</div>
    <h1 className="introHeading">Nike Trivia</h1>
    <div className="introLabel">Click to Start</div>
    <button onClick={setGameStatus} className="introButton">
      Just Do It
    </button>
  </Card>
);

export default Welcome;
