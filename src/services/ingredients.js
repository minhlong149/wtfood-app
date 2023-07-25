export async function getAllIngredients() {
  try {
    const response = await fetch("/api/ingredients");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
