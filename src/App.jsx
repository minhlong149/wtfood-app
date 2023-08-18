import React, { useEffect, useState } from "react";

import { Ingredients } from "./components/Ingredients";
import { Search } from "./components/Search";

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
        setSearchQuery("");
      } else {
        setWrongIngredientIds([...wrongIngredientIds, ingredientId]);
        if (remainingIngredients.length < 2) {
          setSearchQuery("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const correctIngredients = ingredients.filter((ingredient) =>
    correctIngredientIds.includes(ingredient.id)
  );

  const remainingIngredients =
    searchQuery.length < 2
      ? []
      : ingredients.filter(
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

      <Search value={searchQuery} handleOnChange={setSearchQuery} />

      <Ingredients
        ingredients={remainingIngredients}
        checkRecipe={checkRecipe}
      />
    </div>
  );
}

export default App;
