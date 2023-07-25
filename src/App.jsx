import React, { useEffect, useState } from "react";

import * as dishService from "./services/dishes";
import * as ingredientService from "./services/ingredients";
import * as recipeService from "./services/recipes";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [correctIngredientIds, setCorrectIngredientIds] = useState([]);
  const [wrongIngredientIds, setWrongIngredientIds] = useState([]);
  const [dish, setDish] = useState({});

  const getAllIngredients = async () => {
    try {
      const ingredients = await ingredientService.getAllIngredients();
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
      const dish = await dishService.getRandomDish();
      setDish(dish);
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
      if (recipe.correct) {
        setCorrectIngredientIds([...correctIngredientIds, ingredientId]);
      } else {
        setWrongIngredientIds([...wrongIngredientIds, ingredientId]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const correctIngredients = ingredients.filter((ingredient) =>
    correctIngredientIds.includes(ingredient.id)
  );

  const remainingIngredients = ingredients.filter(
    (ingredient) =>
      !correctIngredientIds.includes(ingredient.id) &&
      !wrongIngredientIds.includes(ingredient.id)
  );

  return (
    <div>
      <h1>{`${dish.name} 🔮 ${correctIngredients.length}/${dish.ingredients}`}</h1>
      <button onClick={() => getRandomDish()}>Change dish</button>

      <p>
        Guess correct:{" "}
        {correctIngredients.map((ingredient) => ingredient.name).join(", ")}
      </p>

      {remainingIngredients.map((ingredient) => (
        <button key={ingredient.id} onClick={() => checkRecipe(ingredient.id)}>
          {ingredient.name}
        </button>
      ))}
    </div>
  );
}

export default App;
