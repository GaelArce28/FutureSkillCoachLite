import { useEffect, useState } from "react";
import { createClient } from "../api/clientApi";
import { getCoaches } from "../api/coachApi";
import "../App.css";

const initialClientForm = {
  fullName: "",
  email: "",
  password: "",
  goal: "",
  coachId: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ClientsPage() {
  // Datos del formulario de registro.
  const [formData, setFormData] = useState(initialClientForm);

  // Lista necesaria solo para llenar el select de coaches.
  const [coaches, setCoaches] = useState([]);

  // Estados de control para mostrar mensajes y evitar doble registro.
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadCoaches() {
      try {
        setErrorMessage("");

        const coachesData = await getCoaches();
        setCoaches(coachesData);
      } catch {
        setCoaches([]);
        setErrorMessage("No se pudieron cargar los coaches.");
      }
    }

    loadCoaches();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function getCleanClientData() {
    return {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      goal: formData.goal.trim(),
      coachId: formData.coachId,
    };
  }

  function validateClientData(clientData) {
    if (
      !clientData.fullName ||
      !clientData.email ||
      !clientData.password ||
      !clientData.goal ||
      !clientData.coachId
    ) {
      return "Todos los campos son obligatorios.";
    }

    if (!emailPattern.test(clientData.email)) {
      return "Ingrese un correo electrónico válido.";
    }

    if (clientData.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const clientData = getCleanClientData();
    const validationMessage = validateClientData(clientData);

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    try {
      setSaving(true);

      await createClient({
        ...clientData,
        coachId: Number(clientData.coachId),
      });

      setSuccessMessage("Cliente registrado correctamente.");
      setFormData(initialClientForm);
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar el cliente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="clientes-admin-page">
      <section className="clientes-form-card">
        <h1>Registrar cliente</h1>

        <p className="clientes-description">
          Cree un nuevo cliente, asígnelo a un coach y defina su contraseña de
          acceso.
        </p>

        {errorMessage && <div className="alert error">{errorMessage}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="clientes-form">
          <label>
            Nombre completo
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ingrese el nombre completo del cliente"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="cliente@email.com"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese una contraseña"
            />
          </label>

          <label>
            Objetivo
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="Ingrese el objetivo del cliente"
              rows="4"
            />
          </label>

          <label>
            Coach
            <select
              name="coachId"
              value={formData.coachId}
              onChange={handleChange}
              disabled={coaches.length === 0}
            >
              <option value="">Seleccione un coach</option>

              {coaches.map((coach) => (
                <option key={coach.coachId} value={coach.coachId}>
                  {coach.fullName} - {coach.specialty}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={saving || coaches.length === 0}>
            {saving ? "Registrando..." : "Registrar cliente"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ClientsPage;