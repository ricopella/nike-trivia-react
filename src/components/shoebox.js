import React from "react";
import Swoosh from "../assets/swoosh.png";

const notSelected = `#ff6600`;
const isSelected = `#e2142d`;
const isAnsweredColor = `#484848`;
const notSelectedShadow = `#993d00`;
const isSelectedShadow = `#9b0d1e`;

const ShoeBox = ({ index, number, selected, handleClick, isAnswered }) => (
  <div
    className={`shoeBoxContainer ${isAnswered ? "answered" : ""}`}
    onClick={() => (!selected ? handleClick(index) : null)}
    data-testid="shoebox_container"
  >
    <div
      className="shoeBoxTop"
      style={{
        backgroundColor: isAnswered
          ? isAnsweredColor
          : selected
          ? isSelected
          : notSelected
      }}
    />
    <div
      className="shoeBoxBottom"
      style={{
        backgroundColor: isAnswered
          ? isAnsweredColor
          : selected
          ? isSelected
          : notSelected
      }}
    >
      <div
        className="shoeBoxShadow"
        style={{
          backgroundColor: isAnswered
            ? isAnsweredColor
            : selected
            ? isSelectedShadow
            : notSelectedShadow
        }}
      />
      <img src={Swoosh} className="shoeBoxImg" alt={"Nike Swoosh Logo"} />
      <div className="shoeBoxQuestionNumber">{number}</div>
    </div>
  </div>
);

export default ShoeBox;
