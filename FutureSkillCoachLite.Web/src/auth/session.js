// Manejo centralizado de la sesión del usuario
// Así evitamos repetir localStorage y validaciones de rol en varias pantallas

export function getCurrentUser() {
  const userData = localStorage.getItem("usuario");

  if (!userData || userData === "undefined" || userData === "null") {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch {
    clearSession();
    return null;
  }
}

export function getCurrentRole() {
  const user = getCurrentUser();

  return getUserRole(user);
}

export function getUserRole(user) {
  return user?.role || user?.rol || user?.userRole || null;
}

export function hasRole(userRole, allowedRoles) {
  if (!userRole || !allowedRoles?.length) {
    return false;
  }

  const normalizedRole = userRole.toLowerCase();

  return allowedRoles.some(
    (allowedRole) => allowedRole.toLowerCase() === normalizedRole
  );
}

export function getCurrentClientId() {
  const user = getCurrentUser();

  return user?.clientId || user?.ClientId || user?.id || user?.Id || null;
}

export function getCurrentCoachId() {
  const user = getCurrentUser();

  return user?.coachId || user?.CoachId || user?.id || user?.Id || null;
}

export function saveSession(user) {
  clearSession();

  localStorage.setItem("usuario", JSON.stringify(user));

  if (user?.token) {
    localStorage.setItem("token", user.token);
  }

  const role = getUserRole(user);

  if (role === "Client") {
    localStorage.setItem("cliente", JSON.stringify(user));
  }

  if (role === "Coach") {
    localStorage.setItem("coach", JSON.stringify(user));
  }
}

export function clearSession() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("cliente");
  localStorage.removeItem("coach");
  localStorage.removeItem("token");
}

export function logout() {
  clearSession();
}