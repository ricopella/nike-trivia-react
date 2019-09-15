import React, { useState } from "react";
import questions from "../data/questions";
import Card from "./card";
import createPlayerAnswerCache from "../utils/createPlayerAnswerCache";
import sumPlayerScore from "../utils/sumPlayerScore";
import ShoeBox from "../components/shoebox";
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

  return (
    <div className="gameContainer">
      <div className="questionsQueueContainer">
        {questions.map((x, i) => (
          <ShoeBox number={i + 1} />
        ))}
      </div>
      <Card>
        <div className="questionWrapper">
          {questions[currentQuestionIndex] ? (
            <>
              <h3>{questions[currentQuestionIndex].question}</h3>
              <div className="answersWrapper">
                {questions[currentQuestionIndex].answers.map((y, i) => (
                  <button
                    onClick={e => setSelectedAnswer(e, i)}
                    className={`answer ${
                      currentSelectedAnswer === i ? "selected" : ""
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
              <button onClick={e => setQuestionIndex(e)}>Next Question</button>
            </>
          ) : (
            <div>Final Score: {finalScore}</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuestionPage;
