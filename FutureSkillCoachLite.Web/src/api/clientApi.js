const API_URL = "http://localhost:5140/api";

export async function createClient(clientData) {
  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el cliente.");
  }

  return await response.json();
}