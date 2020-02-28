import React, { useEffect, useState } from "react";
import Card from "./card";
import createPlayerAnswerCache from "../utils/createPlayerAnswerCache";
import sumPlayerScore from "../utils/sumPlayerScore";
import ShoeBox from "../components/shoebox";
import ShoeboxLabel from "../components/shoeLabel";
import "../styles.css";
import setUsersScore from "../utils/setUsersScore";
import questions from "../data/questions";

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

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      {/* TODO: style timer */}
      <h1>{timeLeft}</h1>
      <div className="gameContainer">
        {!finalScore && timeLeft !== 0 ? (
          <>
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
                  />
                ))}
            </div>
          </>
        ) : (
          // TODO: style final score
          // add a reset button
          <ShoeboxLabel
            label={{ question: `Final Score:` }}
            currentQuestionIndex={
              !Number.isNaN(finalScore) && finalScore > 0 ? finalScore - 1 : 0
            }
          />
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
