import React, { lazy, useState, Suspense } from "react";
import Welcome from "../components/welcome";

const QuestionPage = lazy(() => import("../components/questions"));

const GameContainer = () => {
  const [gameIsStarted, setGameIsStarted] = useState(false);

  const setGameStatus = () => setGameIsStarted(true);

  const renderContent = () => (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {gameIsStarted ? (
          <QuestionPage />
        ) : (
          <Welcome setGameStatus={setGameStatus} />
        )}
      </Suspense>
    </>
  );

  return <div>{renderContent()}</div>;
};

export default GameContainer;
