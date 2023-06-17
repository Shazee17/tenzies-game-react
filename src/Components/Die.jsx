import React from "react";

const Die = ({ number, held }) => {
  return (
    <div className={`die ${held ? "held" : ""}`}>
      <div className="number">{number}</div>
    </div>
  );
};

export default Die;
