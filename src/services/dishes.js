import * as userService from "./users";

export async function getRandomDish() {
  try {
    const response = await fetch("/api/dishes/random");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllDishes() {
  try {
    const response = await fetch("/api/dishes/all", {
      headers: { Authorization: userService.getToken() },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDishById(id) {
  try {
    const response = await fetch(`/api/dishes/${id}`, {
      headers: { Authorization: userService.getToken() },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
