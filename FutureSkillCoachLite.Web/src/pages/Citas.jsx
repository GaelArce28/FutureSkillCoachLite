import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointmentApi";
import "../App.css";

function Citas() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      setLoading(true);
      setErrorMessage("");

      const appointmentsData = await getAppointments();
      setAppointments(appointmentsData);
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar las citas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="citas-page">
      <div className="citas-header">
        <div>
          <h2>Consultar Citas</h2>
          <p className="citas-subtitulo">
            Visualice las citas registradas y su información principal.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="toast toast-error">{errorMessage}</div>
      )}

      <div className="tabla-wrapper">
        {loading ? (
          <div className="tabla-vacia">
            <p>Cargando citas...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="tabla-vacia">
            <p>No hay citas registradas.</p>
          </div>
        ) : (
          <table className="tabla-citas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tema</th>
                <th>Estado</th>
                <th>Cliente</th>
                <th>Coach</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.topic}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.clientName}</td>
                  <td>{appointment.coachName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Citas;