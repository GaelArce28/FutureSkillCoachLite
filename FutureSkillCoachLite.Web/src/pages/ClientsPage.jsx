import { useEffect, useState } from "react";
import { createClient, getClients } from "../api/clientApi";
import { getCoaches } from "../api/coachApi";
import "../App.css";

function ClientsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    goal: "",
    coachId: "",
  });

  const [clients, setClients] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setErrorMessage("");

      const clientsData = await getClients();
      setClients(clientsData);

      try {
        const coachesData = await getCoaches();
        setCoaches(coachesData);
      } catch {
        setCoaches([]);
        setErrorMessage("No se pudieron cargar los coaches.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar la información.");
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

  function getCoachName(client) {
    if (client.coachName) {
      return client.coachName;
    }

    const coach = coaches.find(
      (coachItem) => coachItem.coachId === client.coachId
    );

    return coach ? coach.fullName : client.coachId;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.goal.trim() ||
      !formData.coachId
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

      const clientToCreate = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        goal: formData.goal.trim(),
        coachId: Number(formData.coachId),
      };

      await createClient(clientToCreate);

      setSuccessMessage("Cliente registrado correctamente.");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        goal: "",
        coachId: "",
      });

      await loadInitialData();
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

      <section className="clientes-list-card">
        <h2>Clientes registrados</h2>

        {loading ? (
          <p className="mensaje-info">Cargando clientes...</p>
        ) : clients.length === 0 ? (
          <p className="mensaje-info">No hay clientes registrados.</p>
        ) : (
          <div className="clientes-table-wrapper">
            <table className="clientes-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Objetivo</th>
                  <th>Coach</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.clientId}>
                    <td>{client.clientId}</td>
                    <td>{client.fullName}</td>
                    <td>{client.email}</td>
                    <td>{client.goal}</td>
                    <td>{getCoachName(client)}</td>
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

export default ClientsPage;