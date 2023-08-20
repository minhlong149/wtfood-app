import React from "react";

export function IngredientList({ ingredients, checkRecipe }) {
  return (
    <section className="2xl:columns-7 xl:columns-6 lg:columns-5 md:columns-4 sm:columns-3 columns-2 gap-4">
      {ingredients.map((ingredient) => (
        <button
          className="rounded bg-gray-200 hover:bg-gray-300 px-4 py-2 mb-2 flex flex-col items-center gap-2 w-full"
          onClick={() => checkRecipe(ingredient.id)}
          key={ingredient.id}
        >
          {ingredient.image && (
            <img
              src={ingredient.image}
              alt={ingredient.name}
              width="180"
              height="180"
              className="rounded"
              loading="lazy" />
          )}
          <span>{ingredient.name}</span>
        </button>
      ))}
    </section>
  );
}
