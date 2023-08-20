import React, { useEffect, useState } from "react";

import { Dishes } from "./Dishes";
import { Login } from "./Login";

import { CorrectGuess } from "./components/CorrectGuess";
import { GameplayHeader } from "./components/GameplayHeader";
import { IngredientList } from "./components/IngredientList";
import { OptionHeader } from "./components/OptionHeader";
import { Search } from "./components/Search";

import * as dishService from "./services/dishes";
import * as ingredientService from "./services/ingredients";
import * as recipeService from "./services/recipes";
import * as userService from "./services/users";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [correctIngredientIds, setCorrectIngredientIds] = useState([]);
  const [wrongIngredientIds, setWrongIngredientIds] = useState([]);
  const [dish, setDish] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [showAllDishes, setShowAllDishes] = useState(false);

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

  const updateDish = (dishResponse) => {
    setDish({
      ...dishResponse.dish,
      ingredients: dishResponse.ingredients,
    });
    setCorrectIngredientIds([]);
    setWrongIngredientIds([]);
  };

  const getRandomDish = async () => {
    try {
      const response = await dishService.getRandomDish();
      updateDish(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomDish();
  }, []);

  useEffect(() => {
    if (correctIngredientIds.length === dish.ingredients) {
      alert("You win!");
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

  const headerText =
    dish.id !== undefined
      ? `${dish.name} 🔮 ${correctIngredients.length}/${dish.ingredients} ❌ ${wrongIngredientIds.length}`
      : "What the Food";

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;

      const user = await userService.login(username, password);

      userService.setToken(user.token);
      setShowLogin(false);
      setLoggedIn(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      setLoginError(error.message);
      setTimeout(() => setLoginError(""), 7000);
    }
  };

  return showAllDishes ? (
    <Dishes setShowAllDishes={setShowAllDishes} updateDish={updateDish} />
  ) : (
    <>
      <main className="flex flex-col gap-4 m-4">
        <header className="flex items-center justify-center gap-2 text-3xl">
          <OptionHeader
            loggedIn={loggedIn}
            setShowLogin={setShowLogin}
            setShowAllDishes={setShowAllDishes}
          />
          <GameplayHeader
            getRandomDish={getRandomDish}
            headerText={headerText}
          />
        </header>
        <CorrectGuess correctIngredients={correctIngredients} />
        <Search
          value={searchQuery}
          handleOnChange={setSearchQuery}
          placeholder="search for ingredients"
        />
        <IngredientList
          ingredients={remainingIngredients}
          checkRecipe={checkRecipe}
        />
      </main>

      <Login
        showLogin={showLogin}
        handleLogin={handleLogin}
        loginError={loginError}
        setShowLogin={setShowLogin}
      />
    </>
  );
}

export default App;
