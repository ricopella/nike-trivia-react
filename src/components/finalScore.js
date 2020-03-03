import React from "react";
import Card from "../components/card";

const FinalScore = ({ restartGame, score }) => (
  <Card className="welcomeCard">
    <h2 className="introHeading">Total Score</h2>
    <h1 className="introHeading">{score} out of 10</h1>
    <div>Thanks For Playing!</div>
    <button onClick={restartGame} className="introButton restart">
      Try Again
    </button>
  </Card>
);

export default FinalScore;
