import React from "react";

export function DishList({ dishes, handleChangeDish }) {
  return (
    <section className="flex flex-wrap justify-between gap-2 mx-2 after:flex-auto">
      {dishes.map((dish) => (
        <button
          key={dish.id}
          onClick={() => handleChangeDish(dish.id)}
          className="rounded bg-gray-200 hover:bg-gray-300 px-4 py-2"
        >
          {dish.name}
        </button>
      ))}
    </section>
  );
}
