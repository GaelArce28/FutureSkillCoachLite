const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";

export async function getCoaches() {
  const response = await fetch(`${API_URL}/Coaches`);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar los coaches.");
  }

  return await response.json();
}
