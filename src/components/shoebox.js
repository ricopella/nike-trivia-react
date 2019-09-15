import React from "react";

const ShoeBox = ({ number }) => (
  <div className="shoeBoxContainer">
    <div className="shoeBoxTop" />
    <div className="shoeBoxBottom">
      <div className="shoeBoxShadow" />
      <img
        src="https://myrealdomain.com/images/nike-swoosh-vector-2.png"
        className="shoeBoxImg"
        alt={"Nike Swoosh Logo"}
      />
      <div className="shoeBoxQuestionNumber">{number}</div>
    </div>
  </div>
);

export default ShoeBox;
