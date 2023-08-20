import React from "react";

export function CorrectGuess({ correctIngredients }) {
  if (correctIngredients.length === 0) {
    return null;
  }

  return (
    <p className="text-center">
      Guess correct:{" "}
      {correctIngredients.map((ingredient) => ingredient.name).join(", ")}
    </p>
  );
}
