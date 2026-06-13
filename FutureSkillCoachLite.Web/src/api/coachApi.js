const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";
console.log("API_URL usado:", API_URL);

async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getCoaches() {
  const response = await fetch(`${API_URL}/Coaches`);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar los coaches.");
  }

  return await readJsonResponse(response);
}

export async function createCoach(coachData) {
  const response = await fetch(`${API_URL}/Coaches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coachData),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Error al registrar el coach.");
  }

  return await readJsonResponse(response);
}