import React from "react";

function Select({ handleState, states, label, labels }) {
  return (
    <div className="select">
      {states.map((state, idx) => {
        return (
          <p key={idx} onClick={() => handleState(state)}>
            {typeof state === "object" ? Object.values(state)[0] : state}
            {labels && labels.length > 0 && labels[idx]}
            {label && label}
          </p>
        );
      })}
      {/* <p onClick={() => handleDifficulty({ duration: 15 })}>15s</p>
      <p onClick={() => handleDifficulty({ duration: 30 })}>30s</p>
      <p onClick={() => handleDifficulty({ duration: 45 })}>45s</p>
      <p onClick={() => handleDifficulty({ duration: 60 })}>60s</p> */}
    </div>
  );
}

export default Select;
