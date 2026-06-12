export function getCurrentUser() {
  const userData = localStorage.getItem("usuario");

  if (!userData || userData === "undefined" || userData === "null") {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch {
    localStorage.removeItem("usuario");
    return null;
  }
}

export function getCurrentRole() {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return user.role || user.rol || user.userRole || null;
}

export function logout() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("cliente");
  localStorage.removeItem("coach");
  localStorage.removeItem("token");
}