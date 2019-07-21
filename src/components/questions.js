import React from "react";
import questions from "../data/questions";
import Card from "./card";

const QuestionPage = () => {
  return (
    <Card>
      {questions.map((x, i) => {
        return (
          <div className="questionWrapper">
            <h3>{x.question}</h3>
            <div className="answersWrapper">
              {x.answers.map(y => (
                <div className="answer">{y}</div>
              ))}
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default QuestionPage;
