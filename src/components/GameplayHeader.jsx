import React from "react";

export function GameplayHeader({ getRandomDish, headerText }) {
  return (
    <>
      <button onClick={() => getRandomDish()} title="Get new dish">
        🔄
      </button>
      <h1 className="font-bold text-center">{headerText}</h1>
    </>
  );
}
