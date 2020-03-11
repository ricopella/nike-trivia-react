import questions from "../data/questions";

const setUsersScore = (
  playersAnswers,
  currentSelectedAnswer,
  currentQuestionIndex
) => {
  const answersClone = [...playersAnswers];

  answersClone[currentQuestionIndex] = {
    correct:
      typeof currentSelectedAnswer === "number"
        ? questions[currentQuestionIndex].correct === currentSelectedAnswer
        : null,
    selected: currentSelectedAnswer
  };

  const answeredCount = answersClone
    .map(question => (typeof question.selected === "number" ? 1 : 0))
    .reduce((acc, cur) => acc + cur, 0);

  return [answersClone, answeredCount];
};

export default setUsersScore;
