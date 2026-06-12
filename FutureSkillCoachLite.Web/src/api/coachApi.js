const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5140";

function getHeaders() {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function readJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("La respuesta del servidor no es JSON válido:", text);
    throw new Error("La respuesta del servidor no es válida.");
  }
}

export async function getCoaches() {
  const response = await fetch(`${API_URL}/api/coaches`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar los coaches.");
  }

  const data = await readJsonResponse(response);

  return data || [];
}

export async function createCoach(coachData) {
  const response = await fetch(`${API_URL}/api/coaches`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(coachData),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message || "Error al registrar el coach.");
  }

  return await readJsonResponse(response);
}