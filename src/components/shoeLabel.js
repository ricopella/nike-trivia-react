import React from "react";
import Barcode from "react-barcode";

const ShoeboxLabel = ({
  label,
  setSelectedAnswer,
  setQuestionIndex,
  currentSelectedAnswer
}) => {
  return (
    <div className="shoeBoxLabelContainer">
      <div />
      <div className="shoeBoxBarCodeWrapper">
        <Barcode value="AIR MAX 1 PRM" height={30} width={1} />
      </div>
      <div className="shoeBoxLabelContentWrapper">
        <h3>{label.question}</h3>
        <div className="answersWrapper">
          {label.answers.map((y, i) => (
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
      </div>
      <div className="shoeBoxPriceWrapper">
        <div className="shoeBoxPriceText">Suggested Retail: $199.99</div>
      </div>
    </div>
  );
};

export default ShoeboxLabel;
