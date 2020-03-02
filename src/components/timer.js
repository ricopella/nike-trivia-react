import React from "react";

const Timer = ({ timeLeft = 0 }) => (
  <div className="timerWrapper">
    <div className="timeHeading">Time Remaining</div>
    <div className={`timeValue ${timeLeft <= 10 ? "alert" : ""}`}>
      {timeLeft}
    </div>
  </div>
);

export default Timer;
