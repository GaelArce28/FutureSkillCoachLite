const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";

async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getClients() {
  const response = await fetch(`${API_URL}/Clients`);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar los clientes.");
  }

  return await readJsonResponse(response);
}

export async function createClient(clientData) {
  const response = await fetch(`${API_URL}/Clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Error al registrar el cliente.");
  }

  return await readJsonResponse(response);
}
