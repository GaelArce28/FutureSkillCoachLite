import { useState } from "react";
import { createCoach } from "../api/coachApi";
import "../App.css";

const initialCoachForm = {
  fullName: "",
  specialty: "",
  email: "",
  password: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Entrenadores() {
  // Datos del formulario de registro.
  const [formData, setFormData] = useState(initialCoachForm);

  // Estados de control para mostrar mensajes y evitar doble registro.
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function getCleanCoachData() {
    return {
      fullName: formData.fullName.trim(),
      specialty: formData.specialty.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
  }

  function validateCoachData(coachData) {
    if (
      !coachData.fullName ||
      !coachData.specialty ||
      !coachData.email ||
      !coachData.password
    ) {
      return "Todos los campos son obligatorios.";
    }

    if (!emailPattern.test(coachData.email)) {
      return "Ingrese un correo electrónico válido.";
    }

    if (coachData.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const coachData = getCleanCoachData();
    const validationMessage = validateCoachData(coachData);

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    try {
      setSaving(true);

      await createCoach(coachData);

      setSuccessMessage("Coach registrado correctamente.");
      setFormData(initialCoachForm);
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar el coach.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="entrenadores-admin-page">
      <section className="entrenadores-form-card">
        <h1>Registrar coach</h1>

        <p className="entrenadores-description">
          Cree un nuevo coach ingresando su nombre completo, especialidad,
          correo y contraseña.
        </p>

        {errorMessage && <div className="alert error">{errorMessage}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="entrenadores-form">
          <label>
            Nombre completo
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ingrese el nombre completo del coach"
            />
          </label>

          <label>
            Especialidad
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Ingrese la especialidad del coach"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="coach@email.com"
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

          <button type="submit" disabled={saving}>
            {saving ? "Registrando..." : "Registrar coach"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Entrenadores;