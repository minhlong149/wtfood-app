export async function getRandomDish() {
  try {
    const response = await fetch("/api/dishes");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
