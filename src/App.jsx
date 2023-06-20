import React, { useEffect, useState } from "react";
import "./App.css";
import Typing from "./components/Typing";
import SelectDifficulty from "./components/SelectDifficulty";
import Select from "./components/Select";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [gameState, setGameState] = useState(null);
  const [scores, setScores] = useState({
    totalAttempts: 0,
    mistakes: 0,
  });

  const [totalDuration, setTotalDuration] = useState(15);
  const [duration, setDuration] = useState(15);

  const durations = [15, 30, 45, 60];
  const difficulties = ["easy", "medium", "hard"];

  useEffect(() => {
    if (
      !gameState ||
      gameState === "set" ||
      gameState === "winner" ||
      gameState === "lost"
    )
      return;
    const timer = setInterval(() => {
      setDuration((prevDuration) => prevDuration - 1);
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (duration <= 0) {
      setGameState("lost");
    }
  }, [duration]);

  const handleDifficulty = (state) => {
    setDifficulty(() => state);
    setGameState("set");
    setScores(() => ({
      totalAttempts: 0,
      mistakes: 0,
    }));
  };

  const handleDuration = (duration) => {
    setDuration(() => duration);
    setGameState("set");
    setScores(() => ({
      totalAttempts: 0,
      mistakes: 0,
    }));
  };

  const handleRestart = () => {
    setDuration(() => totalDuration);
    setGameState("set");
    setScores(() => ({
      totalAttempts: 0,
      mistakes: 0,
    }));
  };

  return (
    <div>
      {/* {<SelectDifficulty handleState={handleDifficulty} />} */}
      {gameState === "playing" ||
        gameState === "lost" ||
        (gameState === "winner" && (
          <button onClick={handleRestart}>Restart</button>
        ))}
      {<Select handleState={handleDifficulty} states={difficulties} />}
      {<Select handleState={handleDuration} label={"s"} states={durations} />}
      {gameState === "playing" && <p>{duration} left</p>}
      {gameState === "winner" && (
        <>
          <p>
            Congratulations! You finished within{" "}
            {durations[difficulties.indexOf(difficulty)] - duration} seconds
            left.
          </p>
        </>
      )}
      {gameState === "lost" && (
        <>
          <p>You Lost. Try Again.</p>
        </>
      )}
      {
        <Typing
          scores={scores}
          handleScores={setScores}
          handleGameState={setGameState}
          gameState={gameState}
          difficulty={difficulty}
          totalDuration={totalDuration}
        />
      }
    </div>
  );
}

export default App;
