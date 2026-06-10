import { useEffect, useState } from "react";
import { createCoach, getCoaches } from "../api/coachApi";
import "../App.css";

function Entrenadores() {
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    email: "",
  });

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
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

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearForm() {
    setFormData({
      fullName: "",
      specialty: "",
      email: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.specialty.trim() ||
      !formData.email.trim()
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Ingrese un correo electrónico válido.");
      return;
    }

    try {
      const coachToCreate = {
        fullName: formData.fullName,
        specialty: formData.specialty,
        email: formData.email,
      };

      const createdCoach = await createCoach(coachToCreate);

      setCoaches((previousCoaches) => [...previousCoaches, createdCoach]);
      setSuccessMessage("Coach registrado correctamente.");
      clearForm();
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar el coach.");
    }
  }

  return (
    <main className="entrenadores-admin-page">
      <section className="entrenadores-form-card">
        <h1>Registrar coach</h1>

        <p className="entrenadores-description">
          Cree un nuevo coach ingresando su nombre completo, especialidad y correo.
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

          <button type="submit">Registrar coach</button>
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