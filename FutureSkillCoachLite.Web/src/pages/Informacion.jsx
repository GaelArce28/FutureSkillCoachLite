import { useEffect, useState } from "react";
import { getCoaches } from "../api/coachApi";
import "../App.css";

function Informacion() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage(error.message || "Error al cargar los entrenadores.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="informacion">
      <h2>Entrenadores</h2>

      <p>Información sobre nuestros entrenadores y sus actividades.</p>


      {loading && <p className="mensaje-info">Cargando entrenadores...</p>}

      {errorMessage && <p className="mensaje-error">{errorMessage}</p>}

      {!loading && !errorMessage && coaches.length === 0 && (
        <p className="mensaje-info">No hay entrenadores registrados.</p>
      )}

      <div className="info-grid">
        {coaches.map((coach) => (
          <div className="info-card" key={coach.coachId}>
            <h3>{coach.fullName}</h3>

            <p>
              <strong>Actividad:</strong> {coach.specialty}
            </p>

            <p>
              <strong>Correo:</strong> {coach.email}
            </p>

         
          </div>
        ))}
      </div>
    </section>
  );
}

export default Informacion;