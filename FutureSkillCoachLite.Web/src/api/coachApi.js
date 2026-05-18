const API_URL = "http://localhost:5140/api";

export async function getCoaches() {
  const response = await fetch(`${API_URL}/coaches`);

  if (!response.ok) {
    throw new Error("Error al cargar los coaches.");
  }

  return await response.json();
}