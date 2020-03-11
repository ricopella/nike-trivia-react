import React from "react";
import Card from "../components/card";
import { motion } from "framer-motion";
import { slideDownFadeInOptions } from "../utils/animations";

const Welcome = ({ setGameStatus }) => (
  <motion.div {...slideDownFadeInOptions}>
    <Card className="welcomeCard">
      <div>Welcome to</div>
      <h1 className="introHeading">Nike Trivia</h1>
      <div className="introLabel">Click to Start</div>
      <button onClick={setGameStatus} className="introButton">
        Just Do It
      </button>
    </Card>
  </motion.div>
);

export default Welcome;
