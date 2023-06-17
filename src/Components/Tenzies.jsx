import React, { useState } from "react";
import Die from "./Die";

const Tenzies = () => {
  const [dice, setDice] = useState(generateDiceValues(10));

  function generateDiceValues(numDice) {
    const diceValues = [];
    for (let i = 0; i < numDice; i++) {
      diceValues.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      });
    }
    return diceValues;
  }

  const rollDice = () => {
    const newDiceValues = dice.map(die => ({
      ...die,
      value: Math.floor(Math.random() * 6) + 1
    }));
    setDice(newDiceValues);
  };

  return (
    <div className="container">
      <div className="text-container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {dice.map((die, index) => (
            <Die key={index} number={die.value} held={die.isHeld} />
          ))}
        </div>
        <button onClick={rollDice} className="roll-dice-button">
          Roll
        </button>
      </div>
    </div>
  );
};

export default Tenzies;
