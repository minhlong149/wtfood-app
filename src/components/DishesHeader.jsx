import React from "react";

export function DishesHeader({ setShowAllDishes }) {
  return (
    <header className="flex items-center justify-center gap-2 text-3xl ">
      <button onClick={() => setShowAllDishes(false)} title="Go back">
        🔙
      </button>
      <h1 className="font-bold text-center">choose your favorite dish</h1>
    </header>
  );
}
