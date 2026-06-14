const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5140/api";
console.log("API_URL usado:", API_URL);

async function readJsonResponse(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

function handleUnauthorized(response) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("cliente");
    localStorage.removeItem("coach");

    window.location.href = "/login";

    throw new Error("Sesión expirada o no autorizada.");
  }
}

export async function getAppointments() {
  const response = await fetch(`${API_URL}/Appointments`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  });

  handleUnauthorized(response);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error al cargar las citas.");
  }

  return await readJsonResponse(response);
}

export async function createAppointment(appointmentData) {
  const response = await fetch(`${API_URL}/Appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(appointmentData),
  });

  handleUnauthorized(response);

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Error al registrar la cita.");
  }

  return await readJsonResponse(response);
}

export async function updateAppointment(appointmentId, appointmentData) {
  const response = await fetch(`${API_URL}/Appointments/${appointmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(appointmentData),
  });

  handleUnauthorized(response);

  if (!response.ok) {
    const error = await readJsonResponse(response);
    throw new Error(error?.message ?? "Error al modificar la cita.");
  }

  return await readJsonResponse(response);
}

export async function cancelAppointment(appointment) {
  const appointmentToCancel = {
    date: appointment.date,
    time: appointment.time,
    topic: appointment.topic,
    status: "Cancelled",
    clientId: appointment.clientId,
    coachId: appointment.coachId,
  };

  return await updateAppointment(
    appointment.appointmentId,
    appointmentToCancel
  );
}