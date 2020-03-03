import React from "react";
import Barcode from "react-barcode";

const ShoeboxLabel = ({
  label,
  setSelectedAnswer,
  setQuestionIndex,
  currentSelectedAnswer,
  currentQuestionIndex
}) => {
  return (
    <div className="shoeBoxLabelContainer">
      <div />
      <div className="shoeBoxBarCodeWrapper">
        <Barcode value="AIR MAX 1 PRM" height={30} width={1} />
      </div>
      <div className="shoeBoxLabelContentWrapper">
        <div className="shoeBoxLabelQuestion">{label.question}</div>
        <div className="showBoxLabelSecondRow">
          <div className="shoeBoxLabelQuestionNumber">
            {`${currentQuestionIndex + 1}.0`}
          </div>
          <div className="answersWrapper">
            {label.answers &&
              label.answers.map((y, i) => (
                <div className="questionRow">
                  {i === 0 ? `UK` : i === 1 ? `BR` : i === 2 ? `CM` : `EUR`}:
                  <button
                    onClick={e =>
                      setSelectedAnswer ? setSelectedAnswer(e, i) : null
                    }
                    className={`answer ${
                      currentSelectedAnswer === i ? "selected" : ""
                    } grow`}
                  >
                    {y}
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="nextQuestionWrapper">
          <div className="shoeCode">508214 001</div>
          <div
            className="nextQuestion grow"
            onClick={e => (setQuestionIndex ? setQuestionIndex(e) : null)}
          >
            {currentQuestionIndex < 9 ? "Next Question" : "FINISH"}
          </div>
        </div>
      </div>
      <div className="shoeBoxPriceWrapper">
        <div className="shoeBoxPriceText">Suggested Retail: $199.99</div>
      </div>
    </div>
  );
};

export default ShoeboxLabel;
