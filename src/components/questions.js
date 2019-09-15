import React, { useState } from "react";
import questions from "../data/questions";
import Card from "./card";
import createPlayerAnswerCache from "../utils/createPlayerAnswerCache";
import sumPlayerScore from "../utils/sumPlayerScore";
import ShoeBox from "../components/shoebox";
import ShoeboxLabel from "../components/shoeLabel";
import "../styles.css";

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [playerAnswersCache, setPlayersAnswersCache] = useState(
    createPlayerAnswerCache()
  );

  const setQuestionIndex = e => {
    e.preventDefault();
    const answersClone = [...playerAnswersCache];
    answersClone[currentQuestionIndex] = {
      correct:
        questions[currentQuestionIndex].correct === currentSelectedAnswer,
      selected: currentSelectedAnswer
    };
    setPlayersAnswersCache(answersClone);

    const currentIndex = currentQuestionIndex + 1;

    if (currentIndex === 10) {
      const finalScore = sumPlayerScore(playerAnswersCache);
      setFinalScore(finalScore);
    }

    setCurrentQuestionIndex(currentIndex);
    setCurrentSelectedAnswer(null);
  };

  const setSelectedAnswer = (e, i) => {
    e.preventDefault();
    setCurrentSelectedAnswer(i);
  };

  const updateCurrentQuestions = index => {
    setCurrentQuestionIndex(index);
  };

  return (
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
            />
          ))}
      </div>
      <Card>
        <div className="questionWrapper">
          {questions[currentQuestionIndex] ? (
            <ShoeboxLabel
              label={questions[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
              setQuestionIndex={setQuestionIndex}
              currentSelectedAnswer={currentSelectedAnswer}
            />
          ) : (
            <div>Final Score: {finalScore}</div>
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
            />
          ))}
      </div>
    </div>
  );
};

export default QuestionPage;
