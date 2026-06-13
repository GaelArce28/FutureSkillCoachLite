import { useEffect, useState } from "react";
import { createCoach, getCoaches } from "../api/coachApi";
import "../App.css";

function Entrenadores() {
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    email: "",
    password: "",
  });

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadCoaches();
  }, []);

  async function loadCoaches() {
    try {
      setLoading(true);
      setErrorMessage("");

      const coachesData = await getCoaches();
      setCoaches(coachesData);
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar los coaches.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearForm() {
    setFormData({
      fullName: "",
      specialty: "",
      email: "",
      password: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.specialty.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Ingrese un correo electrónico válido.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setSaving(true);

      const coachToCreate = {
        fullName: formData.fullName.trim(),
        specialty: formData.specialty.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      await createCoach(coachToCreate);

      setSuccessMessage("Coach registrado correctamente.");
      clearForm();

      await loadCoaches();
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

      <section className="entrenadores-list-card">
        <h2>Coaches registrados</h2>

        {loading ? (
          <p className="mensaje-info">Cargando coaches...</p>
        ) : coaches.length === 0 ? (
          <p className="mensaje-info">No hay coaches registrados.</p>
        ) : (
          <div className="entrenadores-table-wrapper">
            <table className="entrenadores-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Correo</th>
                </tr>
              </thead>

              <tbody>
                {coaches.map((coach) => (
                  <tr key={coach.coachId}>
                    <td>{coach.coachId}</td>
                    <td>{coach.fullName}</td>
                    <td>{coach.specialty}</td>
                    <td>{coach.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Entrenadores;