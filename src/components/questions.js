import React from "react";
import questions from "../data/questions";
import Card from "./card";

const QuestionPage = () => {
  return (
    <Card>
      {questions.map((x, i) => {
        return <div>{x.question}</div>;
      })}
    </Card>
  );
};

export default QuestionPage;
