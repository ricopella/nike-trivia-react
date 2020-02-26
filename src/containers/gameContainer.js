import React, { useState } from "react";
import Welcome from "../components/welcome";
import QuestionPage from "../components/questions";

const GameContainer = () => {
  const [gameIsStarted, setGameIsStarted] = useState(false);

  const setGameStatus = () => setGameIsStarted(true);

  const renderContent = () => (
    <>
      {gameIsStarted ? (
        <QuestionPage />
      ) : (
        <Welcome setGameStatus={setGameStatus} />
      )}
    </>
  );

  return <div>{renderContent()}</div>;
};

export default GameContainer;
