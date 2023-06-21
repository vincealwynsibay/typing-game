import React, { useEffect, useRef, useState } from "react";
import paragraphs from "../assets/prompt.json";

function Typing({
  scores,
  handleScores,
  gameState,
  handleGameState,
  difficulty,
  totalDuration,
}) {
  const [answer, setAnswer] = useState("");
  const [input, setInput] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    if (difficulty) {
      let paragraph =
        paragraphs[`${difficulty}`][
          Math.floor(Math.random() * paragraphs[`${difficulty}`].length)
        ];
      paragraph = { ...paragraph, text: paragraph.text.replaceAll(" ", "␣") };
      setInput("");
      setAnswer(paragraph.text);
    }
  }, [difficulty, totalDuration]);

  useEffect(() => {
    if (gameState === "set") {
      let paragraph =
        paragraphs[`${difficulty}`][
          Math.floor(Math.random() * paragraphs[`${difficulty}`].length)
        ];
      paragraph = { ...paragraph, text: paragraph.text.replaceAll(" ", "␣") };
      setInput("");
      setAnswer(paragraph.text);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "lost") {
      setInput("");
    }
    const handleKeyDown = (e) => {
      if (gameState === "winner" || gameState === "lost") return;

      handleGameState(() => "playing");
      var audio = new Audio("./click1.mp3");

      if (e.key === "Backspace") {
        audio.play();
        setInput((c) => c.substring(0, c.length - 1));
        setSelectedKey("Backspace");
      } else if (
        parseInt(e.keyCode) >= 65 &&
        parseInt(e.keyCode) <= 90 &&
        !(e.getModifierState("CapsLock") || e.shiftKey)
      ) {
        audio.play();
        setInput((c) => c + String.fromCharCode(e.keyCode + 32));
        setSelectedKey((sk) => String.fromCharCode(e.keyCode + 32));
      } else if (
        parseInt(e.keyCode) >= 65 &&
        parseInt(e.keyCode) <= 90 &&
        (e.getModifierState("CapsLock") || e.shiftKey)
      ) {
        audio.play();
        setInput((c) => c + String.fromCharCode(e.keyCode));
        setSelectedKey((sk) => String.fromCharCode(e.keyCode));
      } else if (
        !e.shiftKey &&
        parseInt(e.keyCode) >= 48 &&
        parseInt(e.keyCode) <= 57
      ) {
        audio.play();
        setInput((c) => c + String.fromCharCode(e.keyCode));
        setSelectedKey((sk) => String.fromCharCode(e.keyCode));
      } else if (parseInt(e.keyCode) >= 173 && parseInt(e.keyCode) <= 222) {
        audio.play();
        setInput((c) => c + e.key);
        setSelectedKey((sk) => e.key);
      } else if (parseInt(e.keyCode) === 32) {
        audio.play();
        setInput((c) => c + "␣");
        setSelectedKey("␣");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  useEffect(() => {
    if (input.length > 0 && selectedKey !== "Backspace") {
      if (input.charAt(input.length - 1) !== answer.charAt(input.length - 1)) {
        handleScores((sc) => ({
          ...scores,
          mistakes: sc.mistakes + 1,
          totalAttempts: sc.totalAttempts + 1,
        }));
      } else {
        handleScores((sc) => ({
          ...scores,
          totalAttempts: sc.totalAttempts + 1,
        }));
      }
    }
    if (answer === input) {
      handleGameState(() => "winner");
    }
  }, [input]);

  return (
    <div className="app">
      <h2>Total Attempts: {scores.totalAttempts}</h2>
      <h2>Mistakes: {scores.mistakes}</h2>
      <p>{answer}</p>
      <p>
        {input.split("").map((letter, idx) => {
          if (letter === answer.charAt(idx)) {
            return letter;
          } else {
            return "x";
          }
        })}
      </p>
    </div>
  );
}

export default Typing;
