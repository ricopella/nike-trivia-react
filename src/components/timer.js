import React, { useState, useEffect } from "react";
import "../styles.css";

const TIMER_SECONDS = 60;

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="timerWrapper">
      <div className="timeHeading">Time Remaining</div>
      <div className={`timeValue ${timeLeft <= 10 ? "alert" : ""}`}>
        {timeLeft}
      </div>
    </div>
  );
};

export default Timer;
