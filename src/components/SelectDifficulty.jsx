import React from "react";

function SelectDifficulty({ handleDifficulty }) {
  return (
    <div>
      <p onClick={() => handleDifficulty("easy")}>easy</p>
      <p onClick={() => handleDifficulty("normal")}>30s</p>
      <p onClick={() => handleDifficulty("hard")}>45s</p>
    </div>
  );
}

export default SelectDifficulty;
