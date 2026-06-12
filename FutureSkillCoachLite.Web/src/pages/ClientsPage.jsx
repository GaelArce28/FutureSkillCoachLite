import { useEffect, useState } from "react";
import { createClient, getClients } from "../api/clientApi";
import { getCoaches } from "../api/coachApi";
import "../styles/Clients.css";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setErrorMessage("");

      const [clientsData, coachesData] = await Promise.all([
        getClients(),
        getCoaches(),
      ]);

      setClients(clientsData);
      setCoaches(coachesData);
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar la información.");
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

    try {
      const clientToCreate = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        goal: formData.goal,
        coachId: Number(formData.coachId),
      };

      const createdClient = await createClient(clientToCreate);

      setClients((previousClients) => [...previousClients, createdClient]);
      setSuccessMessage("Cliente registrado correctamente.");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        goal: "",
        coachId: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar el cliente.");
    }
  }

  return (
    <main className="clients-page">
      <section className="clients-card">
        <h1>Registrar cliente</h1>
        <p className="clients-description">
          Cree un nuevo cliente, asigne un coach y defina su contraseña de acceso.
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
            >
              <option value="">Seleccione un coach</option>
              {coaches.map((coach) => (
                <option key={coach.coachId} value={coach.coachId}>
                  {coach.fullName} - {coach.specialty}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Registrar cliente</button>
        </form>
      </section>

      <section className="clients-list-card">
        <h2>Clientes registrados</h2>

        {loading ? (
          <p>Cargando clientes...</p>
        ) : clients.length === 0 ? (
          <p>No hay clientes registrados.</p>
        ) : (
          <div className="clients-table-wrapper">
            <table className="clients-table">
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
                    <td>{client.coachName ?? client.coachId}</td>
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