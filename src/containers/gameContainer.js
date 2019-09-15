import React, { useEffect, useState } from "react";
import Welcome from "../components/welcome";
import QuestionPage from "../components/questions";

const GameContainer = () => {
  const [gameIsStarted, setGameIsStarted] = useState(false);

  const setGameStatus = () => setGameIsStarted(true);

  return (
    <div>
      {/* {gameIsStarted ? ( */}
      <QuestionPage />
      {/* ) : (
        <Welcome setGameStatus={setGameStatus} />
      )} */}
    </div>
  );
};

export default GameContainer;
