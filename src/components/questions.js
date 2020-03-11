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
import { motion } from "framer-motion";
import {
  staggerParentVarients,
  staggerChildLeftVarients,
  staggerChildRightVarients
} from "../utils/animations";

const TIMER_DURATION = 1000 * 60;

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [playerAnswersCache, setPlayersAnswersCache] = useState(() =>
    createPlayerAnswerCache()
  );
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  useEffect(() => {
    setIsTimerStarted(true);

    const intervalId = setInterval(() => {
      setIsTimerStarted(false);
    }, TIMER_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  const updateScore = async () => {
    const [updatedCache, answeredCount] = await setUsersScore(
      playerAnswersCache,
      currentSelectedAnswer,
      currentQuestionIndex
    );

    setPlayersAnswersCache(updatedCache);

    if (
      answeredCount === updatedCache.length ||
      currentQuestionIndex >= updatedCache.length - 1
    ) {
      const finalScore = sumPlayerScore(updatedCache);
      setFinalScore(finalScore);
      setIsTimerStarted(false);
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
    setIsTimerStarted(true);
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
            <motion.div
              className="questionsQueueContainer"
              {...staggerParentVarients}
            >
              {questions
                .filter((x, i) => i < 5)
                .map((x, i) => (
                  <motion.div
                    variants={staggerChildLeftVarients}
                    key={`top_${i}`}
                  >
                    <ShoeBox
                      handleClick={updateCurrentQuestions}
                      index={i}
                      isAnswered={playerAnswersCache[i].selected}
                      key={`top_${i}`}
                      number={i + 1}
                      selected={currentQuestionIndex === i}
                    />
                  </motion.div>
                ))}
            </motion.div>
            <Card>
              <div className="questionWrapper">
                {questions[currentQuestionIndex] ? (
                  <ShoeboxLabel
                    currentQuestionIndex={currentQuestionIndex}
                    currentSelectedAnswer={currentSelectedAnswer}
                    label={questions[currentQuestionIndex]}
                    setQuestionIndex={setQuestionIndex}
                    setSelectedAnswer={setSelectedAnswer}
                  />
                ) : null}
              </div>
            </Card>
            <motion.div
              className="questionsQueueContainer"
              {...staggerParentVarients}
            >
              {questions
                .filter((x, i) => i >= 5)
                .map((x, i) => (
                  <motion.div
                    variants={staggerChildRightVarients}
                    key={`bottom_${i}`}
                  >
                    <ShoeBox
                      handleClick={updateCurrentQuestions}
                      index={i + 5}
                      isAnswered={playerAnswersCache[i + 5].selected}
                      number={i + 1 + 5}
                      selected={currentQuestionIndex === i + 5}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </>
      );
    } else {
      return (
        <FinalScore
          score={!Number.isNaN(finalScore) && finalScore > 0 ? finalScore : 0}
          restartGame={handleResetart}
        />
      );
    }
  };

  return <div className="gameWrapper">{renderContent()}</div>;
};

export default QuestionPage;
