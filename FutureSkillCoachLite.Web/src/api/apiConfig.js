export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";

export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}