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
  const [playerAnswersCache, setPlayersAnswersCache] = useState(() =>
    createPlayerAnswerCache()
  );

  const updateScore = async () => {
    const answersClone = [...playerAnswersCache];

    answersClone[currentQuestionIndex] = {
      correct: currentSelectedAnswer
        ? questions[currentQuestionIndex].correct === currentSelectedAnswer
        : null,
      selected: currentSelectedAnswer
    };
    setPlayersAnswersCache(answersClone);

    const answeredCount = answersClone
      .map(question => (typeof question.selected === "number" ? 1 : 0))
      .reduce((acc, cur) => acc + cur, 0);

    if (answeredCount === playerAnswersCache.length) {
      const finalScore = sumPlayerScore(playerAnswersCache);
      setFinalScore(finalScore);
    }

    // setCurrentQuestionIndex(c => c++);
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

  // TODO: grey out already selected shoe box
  // TODO: do not calc score if all questions have been answered
  // TODO: add timer

  return (
    <div className="gameContainer">
      {!finalScore ? (
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
  );
};

export default QuestionPage;
