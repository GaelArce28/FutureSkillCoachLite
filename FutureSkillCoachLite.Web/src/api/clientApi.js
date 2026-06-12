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
  return text ? JSON.parse(text) : null;
}

export async function getClients() {
  const response = await fetch(`${API_URL}/api/clients`, {
    headers: getHeaders(),
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar los clientes.");
  }

  return await readJsonResponse(response);
}

export async function createClient(clientData) {
  const response = await fetch(`${API_URL}/api/clients`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message || "Error al registrar el cliente.");
  }

  return await readJsonResponse(response);
}

export async function updateClient(clientId, clientData) {
  const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message || "No se pudo actualizar el perfil.");
  }

  if (response.status === 204) {
    return clientData;
  }

  return await readJsonResponse(response);
}

export async function deleteClient(clientId) {
  const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message || "No se pudo eliminar el perfil.");
  }

  return true;
}