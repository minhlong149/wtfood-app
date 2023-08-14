export async function getRandomDish() {
  try {
    const response = await fetch("/api/dishes/random");
    const data = await response.json();
    console.log("🚀 ~ file: dishes.js:5 ~ getRandomDish ~ data:", data)
    return data;
  } catch (error) {
    throw error;
  }
}
