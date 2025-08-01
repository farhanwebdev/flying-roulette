import React from "react";
import "./GameCard.css";

const GameCard = ({ isFlipped, animal }) => {
  return (
    <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
      <div className="card">
        <div className="front">❓</div>
        <div className="back">{animal?.name}</div>
      </div>
    </div>
  );
};

export default GameCard;
