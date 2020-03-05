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

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [playerAnswersCache, setPlayersAnswersCache] = useState(() =>
    createPlayerAnswerCache()
  );
  const [isTimerStarted, setIsTierStarted] = useState(false);

  useEffect(() => {
    setIsTierStarted(true);

    const intervalId = setInterval(() => {
      setIsTierStarted(false);
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  const updateScore = async () => {
    const [updatedCache, answeredCount] = setUsersScore(
      playerAnswersCache,
      currentSelectedAnswer,
      currentQuestionIndex
    );

    setPlayersAnswersCache(updatedCache);

    if (
      answeredCount === playerAnswersCache.length ||
      currentQuestionIndex >= playerAnswersCache.length - 1
    ) {
      const finalScore = sumPlayerScore(playerAnswersCache);
      setFinalScore(finalScore);
      setIsTierStarted(false);
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
    setIsTierStarted(true);
  };

  const renderContent = () => {
    // If user has not answered all questions
    // and the timer is running, show questions
    if (
      !finalScore &&
      isTimerStarted &&
      currentQuestionIndex < playerAnswersCache.length
    ) {
      return (
        <>
          {isTimerStarted ? <Timer /> : <div />}
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
  // TODO: do not allow clicking FINISH if all questions not answered (isLastQuestion)
  return <div className="gameWrapper">{renderContent()}</div>;
};

export default QuestionPage;
