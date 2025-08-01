import React, { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import animals from "./data/animals";
import "./App.css";
// At the top of App.js
import flipSound from '../src/flipcard.mp3';  // adjust path as needed

function App() {
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hiddenAnimal, setHiddenAnimal] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
const [restartCountdown, setRestartCountdown] = useState(null);

const playFlipSound = () => {
  const audio = new Audio(flipSound);
  audio.currentTime = 0;
  audio.play();
};


  useEffect(() => {
    resetRound();
  }, []);

  const resetRound = () => {
    const random = animals[Math.floor(Math.random() * animals.length)];
    setHiddenAnimal(random);
    setSelectedOption(null);
    
    setResultMessage("");
  };

  const handleChoice = (value) => {
    setSelectedOption(value);
  };

  const handleRotate = () => {
    playFlipSound(); // play sound when flipping to back
    setIsFlipped(true);
    const isCorrect = selectedOption === hiddenAnimal.canFly;
setTimeout(() => {
  playFlipSound(); // play sound when flipping to back
  setIsFlipped(false);
}, 2000);
    setTimeout(() => {
     if (isCorrect) {
  const newScore = score + 2;
  setScore(newScore);
  setResultMessage("✅ Correct!");
  if (newScore >= 10) {
    setGameEnded(true);

    // Start countdown
    let countdown = 5;
    setRestartCountdown(countdown);

    const countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        setRestartCountdown(countdown);
      } else {
        clearInterval(countdownInterval);
        setRestartCountdown(null);
        handleReset();
      }
    }, 1000);
  }
}else {
        setScore((prev) => Math.max(0, prev - 1));
        setResultMessage("❌ Wrong!");
      }

      setTimeout(() => {
        if (!gameEnded) resetRound();
      }, 2100);
       
    }, 600); // Wait until card flip animation ends
  };

  const handleReset = () => {
    setScore(0);
    setGameEnded(false);
    resetRound();
  };

  return (
    <div className="app">
     <div className="app-container">
       <h1 className="">🐦 <span className="headingTitle">Flying Roulette</span></h1>
      <h2>Score: {score}</h2>
      <h4 style={{margin:'0'}}>Score 10 points to win!</h4>

      <GameCard isFlipped={isFlipped} animal={hiddenAnimal} />

      {!gameEnded && (
        <div className="controls">
          <button
            className={`choice-btn ${selectedOption === true ? "active" : ""}`}
            onClick={() => handleChoice(true)}
          >
            Fly
          </button>
          <button
            className={`choice-btn ${selectedOption === false ? "active" : ""}`}
            onClick={() => handleChoice(false)}
          >
            Can't Fly
          </button>
        </div>
      )}

      {!gameEnded && selectedOption !== null && (
        <button className="rotate-btn" onClick={handleRotate}>
          Rotate
        </button>
      )}

      {resultMessage && <h3 className="result">{resultMessage}</h3>}

      {gameEnded && (
  <div className="game-over">
    <h2>🎉 You Won!</h2>
    {restartCountdown !== null ? (
      <p>🔄 Restarting in {restartCountdown} seconds...</p>
    ) : (
      <button onClick={handleReset}>Play Again</button>
    )}
  </div>
)}

     </div>
    </div>
  );
}

export default App;
