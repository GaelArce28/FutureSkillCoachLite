const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";
console.log("API_URL usado:", API_URL);

async function readJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("La respuesta del servidor no es válida.");
  }
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || "Correo o contraseña incorrectos.");
  }

  return data;
}