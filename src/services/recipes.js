export async function checkRecipe(ingredientId, dishId) {
  try {
    const response = await fetch(
      `/api/dishes/${dishId}/ingredients/${ingredientId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
