import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../api/clientApi";
import "../styles/Clients.css";

function CoachClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");

    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    const role = user.role || user.rol || user.userRole;

    if (role !== "Coach" && role !== "coach") {
      navigate("/");
      return;
    }

    loadCoachClients(user.coachId);
  }, [navigate]);

  async function loadCoachClients(coachId) {
    try {
      setLoading(true);
      setErrorMessage("");

      const clientsData = await getClients();

      const filteredClients = coachId
        ? clientsData.filter((client) => client.coachId === Number(coachId))
        : clientsData;

      setClients(filteredClients);
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar los clientes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="clients-page">
      <section className="clients-list-card">
        <h1>Mis clientes</h1>

        <p className="clients-description">
          Consulte los clientes asignados a su perfil de coach.
        </p>

        {errorMessage && <div className="alert error">{errorMessage}</div>}

        {loading ? (
          <p>Cargando clientes...</p>
        ) : clients.length === 0 ? (
          <p>No hay clientes asignados.</p>
        ) : (
          <div className="clients-table-wrapper">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Objetivo</th>
                  <th>Coach asignado</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.clientId}>
                    <td>{client.clientId}</td>
                    <td>{client.fullName}</td>
                    <td>{client.email}</td>
                    <td>{client.goal}</td>
                    <td>{client.coachName || client.coachId}</td>
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

export default CoachClientsPage;