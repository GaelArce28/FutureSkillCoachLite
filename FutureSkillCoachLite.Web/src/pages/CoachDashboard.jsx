import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClientById } from "../api/clientApi";
import { getCoaches } from "../api/coachApi";
import { getCurrentUser } from "../auth/session";
import "../App.css";

function CoachDashboard() {
  const [cliente, setCliente] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    cargarDashboard();
  }, []);

  async function cargarDashboard() {
    try {
      setLoading(true);
      setErrorMessage("");

      const usuario = getCurrentUser();

      const clientId =
        usuario?.clientId || usuario?.ClientId || usuario?.id || usuario?.Id;

      if (!clientId) {
        setErrorMessage("No se encontró el ID del cliente logueado.");
        return;
      }

      const [clienteData, coachesData] = await Promise.all([
        getClientById(clientId),
        getCoaches(),
      ]);

      setCliente(clienteData);
      setCoaches(coachesData);
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar el dashboard de coaches.");
    } finally {
      setLoading(false);
    }
  }

  function getCoachAsignado() {
    if (!cliente) {
      return null;
    }

    return coaches.find((coach) => coach.coachId === Number(cliente.coachId));
  }

  const coachAsignado = getCoachAsignado();

  return (
    <main className="coach-dashboard-page">
      <section className="coach-dashboard-header">
        <h1>Dashboard de coaches</h1>

        <p>
          Consulte su coach asignado y los entrenadores disponibles en
          FutureSkill Coach Lite.
        </p>
      </section>

      {errorMessage && <div className="alert error">{errorMessage}</div>}

      {loading ? (
        <p className="mensaje-info">Cargando dashboard...</p>
      ) : (
        <>
          <section className="coach-dashboard-grid">
            <article className="coach-dashboard-card">
              <h3>Mi objetivo</h3>
              <p>{cliente?.goal || "No hay objetivo registrado."}</p>
            </article>

            <article className="coach-dashboard-card">
              <h3>Coach asignado</h3>

              {coachAsignado ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {coachAsignado.fullName}
                  </p>
                  <p>
                    <strong>Especialidad:</strong> {coachAsignado.specialty}
                  </p>
                  <p>
                    <strong>Correo:</strong> {coachAsignado.email}
                  </p>
                </>
              ) : (
                <p>No hay coach asignado.</p>
              )}
            </article>

            <article className="coach-dashboard-card">
              <h3>Accesos rápidos</h3>

              <div className="coach-dashboard-actions">
                <Link to="/perfil" className="perfil-btn">
                  Ver perfil
                </Link>

                <Link to="/citas" className="perfil-btn-secundario">
                  Ver citas
                </Link>
              </div>
            </article>
          </section>

          <section className="entrenadores-list-card">
            <h2>Entrenadores disponibles</h2>

            {coaches.length === 0 ? (
              <p className="mensaje-info">No hay entrenadores registrados.</p>
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
        </>
      )}
    </main>
  );
}

export default CoachDashboard;