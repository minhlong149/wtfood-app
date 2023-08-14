export async function getAllIngredients() {
  try {
    const response = await fetch("/api/ingredients/all");
    const data = await response.json();
    console.log("🚀 ~ file: ingredients.js:5 ~ getAllIngredients ~ data:", data)
    return data;
  } catch (error) {
    throw error;
  }
}
