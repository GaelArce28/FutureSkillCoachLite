const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";

async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Correo o contraseña incorrectos.");
  }

  return await readJsonResponse(response);
}