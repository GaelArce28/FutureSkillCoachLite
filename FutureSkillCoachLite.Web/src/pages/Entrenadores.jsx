import { useEffect, useState } from "react";
import { createCoach, getCoaches } from "../api/coachApi";
import "../styles/Clients.css";

function Entrenadores() {
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    email: "",
    password: "",
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

    try {
      const coachToCreate = {
        fullName: formData.fullName,
        specialty: formData.specialty,
        email: formData.email,
        password: formData.password,
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
    <main className="clients-page">
      <section className="clients-card">
        <h1>Registrar coach</h1>

        <p className="clients-description">
          Cree un nuevo coach ingresando su nombre, especialidad, correo y contraseña.
        </p>

        {errorMessage && <div className="alert error">{errorMessage}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="clients-form">
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

          <button type="submit">Registrar coach</button>
        </form>
      </section>

      <section className="clients-list-card">
        <h2>Coaches registrados</h2>

        {loading ? (
          <p>Cargando coaches...</p>
        ) : coaches.length === 0 ? (
          <p>No hay coaches registrados.</p>
        ) : (
          <div className="clients-table-wrapper">
            <table className="clients-table">
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