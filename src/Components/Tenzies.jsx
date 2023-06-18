import React, { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Tenzies = () => {
  const [dice, setDice] = useState(generateDiceValues(10));
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

  function generateDiceValues(numDice) {
    const diceValues = [];
    for (let i = 0; i < numDice; i++) {
      diceValues.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceValues;
  }

  const rollDice = () => {
    if (!tenzies) {
      const newDiceValues = dice.map((die) => {
        return !die.isHeld ? generateDiceValues(1)[0] : die;
      });
  
      setDice(newDiceValues);
    } else {
      setTenzies(false);
      const newDiceValues = generateDiceValues(10);
      setDice(newDiceValues);
    }
  };
  

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    //If all dice are held, and OR all dice have the same value
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  return (
    <>
      <div className="container">
      {tenzies && <Confetti width={width} height={height} />}
        <div className="text-container">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">
            {dice.map((die) => (
              <Die
                key={die.id}
                number={die.value}
                held={die.isHeld}
                holdDice={() => holdDice(die.id)}
              />
            ))}
          </div>
          <button onClick={rollDice} className="roll-dice-button">
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Tenzies;
