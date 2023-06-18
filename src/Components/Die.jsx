import React from "react";

const Die = ({ number, held, holdDice }) => {
  return (
    <div className={`die ${held ? "held" : ""}`} onClick={holdDice}>
      <div className="number">{number}</div>
    </div>
  );
};

export default Die;
