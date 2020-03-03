import React from "react";
import Card from "../components/card";

const FinalScore = ({ restartGame, score }) => (
  <Card className="welcomeCard">
    <h1 className="introHeading">Total Score: {score}</h1>
    <div className="introLabel">Thanks For Playing!</div>
    <button onClick={restartGame} className="introButton restart">
      Try Again
    </button>
  </Card>
);

export default FinalScore;
