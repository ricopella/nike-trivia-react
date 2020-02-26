import React from "react";

const Card = ({ children, className = "" }) => {
  return <div className={`cardContainer ${className}`}>{children}</div>;
};

export default Card;
