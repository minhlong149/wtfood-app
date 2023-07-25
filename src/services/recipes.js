export async function checkRecipe(ingredientId, dishId) {
  try {
    const response = await fetch(
      `/api/recipes?ingredient=${ingredientId}&dish=${dishId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
