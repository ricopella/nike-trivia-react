import React from "react";
import { motion } from "framer-motion";
import { slideDownFadeInOptions } from "../utils/animations";

const Card = ({ children, className = "" }) => {
  return (
    <motion.div {...slideDownFadeInOptions}>
      <div className={`cardContainer ${className}`}>{children}</div>
    </motion.div>
  );
};

export default Card;
