import React from "react";

const notSelected = `#ff6600`;
const isSelected = `#e2142d`;
const notSelectedShadow = `#993d00`;
const isSelectedShadow = `#9b0d1e`;

const ShoeBox = ({ index, number, selected, handleClick }) => (
  <div
    className="shoeBoxContainer"
    onClick={() => !selected && handleClick(index)}
  >
    <div
      className="shoeBoxTop"
      style={{ backgroundColor: selected ? isSelected : notSelected }}
    />
    <div
      className="shoeBoxBottom"
      style={{ backgroundColor: selected ? isSelected : notSelected }}
    >
      <div
        className="shoeBoxShadow"
        style={{
          backgroundColor: selected ? isSelectedShadow : notSelectedShadow
        }}
      />
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