import React, { useEffect, useState } from "react";

import * as dishService from "./services/dishes";
import * as ingredientService from "./services/ingredients";
import * as recipeService from "./services/recipes";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [correctIngredientIds, setCorrectIngredientIds] = useState([]);
  const [wrongIngredientIds, setWrongIngredientIds] = useState([]);
  const [dish, setDish] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const getAllIngredients = async () => {
    try {
      const { ingredients } = await ingredientService.getAllIngredients();
      ingredients.sort((a, b) => a.name.localeCompare(b.name));
      setIngredients(ingredients);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  const getRandomDish = async () => {
    try {
      const response = await dishService.getRandomDish();
      setDish({
        ...response.dish,
        ingredients: response.ingredients,
      });
      setCorrectIngredientIds([]);
      setWrongIngredientIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomDish();
  }, []);

  useEffect(() => {
    if (correctIngredientIds.length === dish.ingredients) {
      getRandomDish();
    }
  }, [correctIngredientIds]);

  const checkRecipe = async (ingredientId) => {
    try {
      const recipe = await recipeService.checkRecipe(ingredientId, dish.id);
      if (recipe.exist) {
        setCorrectIngredientIds([...correctIngredientIds, ingredientId]);
      } else {
        setWrongIngredientIds([...wrongIngredientIds, ingredientId]);
      }
      setSearchQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  const correctIngredients = ingredients.filter((ingredient) =>
    correctIngredientIds.includes(ingredient.id)
  );

  const remainingIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !correctIngredientIds.includes(ingredient.id) &&
      !wrongIngredientIds.includes(ingredient.id)
  );

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex items-center justify-center gap-2 text-3xl ">
        <button onClick={() => getRandomDish()} title="Get new dish">
          🔄
        </button>
        <h1 className="font-bold text-center">{`${dish.name} 🔮 ${correctIngredients.length}/${dish.ingredients} ❌ ${wrongIngredientIds.length}`}</h1>
      </div>

      {correctIngredients.length > 0 && (
        <p className="text-center">
          Guess correct:{" "}
          {correctIngredients.map((ingredient) => ingredient.name).join(", ")}
        </p>
      )}

      <input
        className="border border-gray-300 rounded-full px-4 py-2 m-1"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for ingredients"
        type="search"
      />

      <div>
        {remainingIngredients.map((ingredient) => (
          <button
            className="rounded-full bg-gray-200 hover:bg-gray-300 px-4 py-2 m-1"
            onClick={() => checkRecipe(ingredient.id)}
            key={ingredient.id}
          >
            {ingredient.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
