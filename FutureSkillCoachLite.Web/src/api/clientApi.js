const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5140").replace(/\/$/, "");
async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getClients() {
  const response = await fetch(`${API_URL}/api/clients`);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar los clientes.");
  }

  return await readJsonResponse(response);
}

export async function getClientById(clientId) {
  const response = await fetch(`${API_URL}/api/clients/${clientId}`);

  if (!response.ok) {
    throw new Error("Error al cargar el cliente.");
  }

  return await readJsonResponse(response);
}

export async function createClient(clientData) {
  const response = await fetch(`${API_URL}/api/clients`, {
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

export async function updateClient(clientId, clientData) {
  const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Error al actualizar el cliente.");
  }

  return await readJsonResponse(response);
}

export async function deleteClient(clientId) {
  const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Error al eliminar el cliente.");
  }

  return true;
}