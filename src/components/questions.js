import React, { useEffect, useState } from "react";
import Card from "./card";
import createPlayerAnswerCache from "../utils/createPlayerAnswerCache";
import sumPlayerScore from "../utils/sumPlayerScore";
import ShoeBox from "../components/shoebox";
import ShoeboxLabel from "../components/shoeLabel";
import "../styles.css";
import setUsersScore from "../utils/setUsersScore";
import questions from "../data/questions";
import Timer from "./timer";
import FinalScore from "./finalScore";

const TIMER_SECONDS = 60;

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [playerAnswersCache, setPlayersAnswersCache] = useState(() =>
    createPlayerAnswerCache()
  );
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  const updateScore = async () => {
    const [updatedCache, answeredCount] = setUsersScore(
      playerAnswersCache,
      currentSelectedAnswer,
      currentQuestionIndex
    );

    setPlayersAnswersCache(updatedCache);

    if (answeredCount === playerAnswersCache.length) {
      const finalScore = sumPlayerScore(playerAnswersCache);
      setFinalScore(finalScore);
      setTimeLeft(0);
    }

    setCurrentSelectedAnswer(null);
  };

  const setQuestionIndex = e => {
    e.preventDefault();
    updateScore();

    setCurrentSelectedAnswer(
      playerAnswersCache[currentQuestionIndex].selected
        ? playerAnswersCache[currentQuestionIndex].selected
        : null
    );
    setCurrentQuestionIndex(c => c + 1);
  };

  const setSelectedAnswer = (e, i) => {
    e.preventDefault();
    setCurrentSelectedAnswer(i);
  };

  const updateCurrentQuestions = index => {
    updateScore();
    setCurrentQuestionIndex(index);
    setCurrentSelectedAnswer(
      playerAnswersCache[index].selected
        ? playerAnswersCache[index].selected
        : null
    );
  };

  const handleResetart = () => {
    setCurrentQuestionIndex(0);
    setCurrentSelectedAnswer(null);
    setFinalScore(null);
    setPlayersAnswersCache(createPlayerAnswerCache());
    setTimeLeft(TIMER_SECONDS);
  };

  useEffect(() => {
    if (!timeLeft) {
      const finalScore = sumPlayerScore(playerAnswersCache);
      setFinalScore(finalScore);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const renderContent = () => {
    // If user has not answered all questions
    // and the time has not run out, show questions
    if (!finalScore && timeLeft !== 0) {
      return (
        <>
          <Timer timeLeft={timeLeft} />
          <div className="gameContainer">
            <div className="questionsQueueContainer">
              {questions
                .filter((x, i) => i < 5)
                .map((x, i) => (
                  <ShoeBox
                    number={i + 1}
                    selected={currentQuestionIndex === i}
                    handleClick={updateCurrentQuestions}
                    index={i}
                    key={`top_${i}`}
                    isAnswered={playerAnswersCache[i].selected}
                  />
                ))}
            </div>
            <Card>
              <div className="questionWrapper">
                {questions[currentQuestionIndex] && (
                  <ShoeboxLabel
                    label={questions[currentQuestionIndex]}
                    setSelectedAnswer={setSelectedAnswer}
                    setQuestionIndex={setQuestionIndex}
                    currentSelectedAnswer={currentSelectedAnswer}
                    currentQuestionIndex={currentQuestionIndex}
                  />
                )}
              </div>
            </Card>
            <div className="questionsQueueContainer">
              {questions
                .filter((x, i) => i >= 5)
                .map((x, i) => (
                  <ShoeBox
                    number={i + 1 + 5}
                    selected={currentQuestionIndex === i + 5}
                    index={i + 5}
                    handleClick={updateCurrentQuestions}
                    key={`bottom_${i}`}
                    isAnswered={playerAnswersCache[i + 5].selected}
                  />
                ))}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <FinalScore
          score={
            !Number.isNaN(finalScore) && finalScore > 0 ? finalScore - 1 : 0
          }
          restartGame={handleResetart}
        />
      );
    }
  };

  // TODO: add animation
  return <div className="gameWrapper">{renderContent()}</div>;
};

export default QuestionPage;
