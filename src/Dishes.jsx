import React, { useEffect, useState } from "react";

import { DishList } from "./components/DishList";
import { DishesHeader } from "./components/DishesHeader";
import { Search } from "./components/Search";

import * as dishService from "./services/dishes";

export function Dishes({ setShowAllDishes, updateDish }) {
  const [dishes, setDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllDishes = async () => {
    try {
      const { dishes } = await dishService.getAllDishes();
      setDishes(dishes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllDishes();
  }, []);

  const handleChangeDish = async (dishId) => {
    try {
      const dishResponse = await dishService.getDishById(dishId);
      updateDish(dishResponse);
      setShowAllDishes(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filterDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex flex-col gap-4 m-4">
      <DishesHeader setShowAllDishes={setShowAllDishes} />
      <Search
        value={searchQuery}
        handleOnChange={setSearchQuery}
        placeholder="search for dishes"
      />
      <DishList dishes={filterDishes} handleChangeDish={handleChangeDish} />
    </main>
  );
}
