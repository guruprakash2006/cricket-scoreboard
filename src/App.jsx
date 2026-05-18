import React, { useEffect, useState } from "react";

const StateAndEffect = () => {
  // State Variables
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [overs, setOvers] = useState(0);
  const [ballHistory, setBallHistory] = useState([]);

  // Function to calculate overs in cricket format (e.g., 1.1, 1.2, ... 1.6)
  const calculateOvers = (totalBalls) => {
    const completedOvers = Math.floor(totalBalls / 6);
    const ballsInCurrentOver = totalBalls % 6;
    return `${completedOvers}.${ballsInCurrentOver}`;
  };

  // Function to add runs
  const addScore = (runs) => {
    const newBalls = balls + 1;
    setBalls(newBalls);
    setScore(score + runs);
    setBallHistory([...ballHistory, runs]);
  };

  // Function for wicket
  const addWicket = () => {
    const newBalls = balls + 1;
    setBalls(newBalls);
    setWickets(wickets + 1);
    setBallHistory([...ballHistory, "W"]);
  };

  // Function to calculate strike rate
  const calculateStrikeRate = () => {
    if (balls === 0) return 0;
    return ((score / balls) * 100).toFixed(2);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        display: "flex",
        gap: "50px",
      }}
    >
      <div>
        <h1 style={{ color: "purple" }}>
          useState and useEffect
        </h1>

        <h2>Cricket Scoreboard</h2>

        <h3>Score: {score}</h3>
        <h3>Wickets: {wickets}</h3>
        <h3>Overs: {calculateOvers(balls)}</h3>
        <h3>Strike Rate: {calculateStrikeRate()}</h3>

        {/* Run Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={() => addScore(1)}>
            1 Run
          </button>

          <button onClick={() => addScore(2)}>
            2 Runs
          </button>

          <button onClick={() => addScore(3)}>
            3 Runs
          </button>

          <button onClick={() => addScore(4)}>
            4 Runs
          </button>

          <button onClick={() => addScore(6)}>
            6 Runs
          </button>
        </div>

        {/* Wicket Button */}
        <button
          onClick={addWicket}
          style={{
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            border: "2px solid blue",
          }}
        >
          Wicket
        </button>
      </div>

      {/* Ball History on Right Side */}
      <div
        style={{
          border: "2px solid purple",
          padding: "20px",
          borderRadius: "5px",
          minWidth: "200px",
        }}
      >
        <h3>Ball by Ball</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {ballHistory.map((event, index) => (
            <div
              key={index}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid black",
                borderRadius: "5px",
                backgroundColor: event === "W" ? "red" : "lightgreen",
                color: event === "W" ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {event}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateAndEffect;