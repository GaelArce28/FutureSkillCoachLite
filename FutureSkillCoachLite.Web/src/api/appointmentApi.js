const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";

async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getAppointments() {
  const response = await fetch(`${API_URL}/Appointments`);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar las citas.");
  }

  return await readJsonResponse(response);
}