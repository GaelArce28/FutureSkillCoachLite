import { useEffect, useState } from "react";
import { getCoaches } from "../api/coachApi";
import "../App.css";

function Informacion() {
  const [loadingCoaches, setLoadingCoaches] = useState(true);
  const [errorCoaches, setErrorCoaches] = useState("");
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    cargarEntrenadoresDesdeBD();
  }, []);

  async function cargarEntrenadoresDesdeBD() {
    try {
      setLoadingCoaches(true);
      setErrorCoaches("");

      const coachesData = await getCoaches();

      const entrenadoresDesdeBD = coachesData.map((coach) => ({
        id: `bd-${coach.coachId}`,
        nombre: coach.fullName,
        actividad: coach.specialty,
        horario: "Horario no definido",
        experiencia: "Experiencia no definida",
        correo: coach.email,
      }));

      setEntrenadores(entrenadoresDesdeBD);
    } catch (error) {
      setErrorCoaches(
        error.message ||
          "Error al cargar los entrenadores desde la base de datos."
      );
    } finally {
      setLoadingCoaches(false);
    }
  }

  return (
    <section className="informacion">
      <div className="info-header">
        <h2>Entrenadores</h2>
        <p>Información sobre nuestros entrenadores y sus actividades.</p>
      </div>

      {loadingCoaches && (
        <p className="mensaje-info">
          Cargando entrenadores desde la base de datos...
        </p>
      )}

      {errorCoaches && <div className="alert error">{errorCoaches}</div>}

      {!loadingCoaches && entrenadores.length === 0 && !errorCoaches && (
        <p className="mensaje-info">No hay entrenadores registrados.</p>
      )}

      <div className="info-grid">
        {entrenadores.map((entrenador) => (
          <div className="info-card" key={entrenador.id}>
            <h3>{entrenador.nombre}</h3>

            <p>
              <strong>Actividad:</strong> {entrenador.actividad}
            </p>

            <p>
              <strong>Horario:</strong> {entrenador.horario}
            </p>

            <p>
              <strong>Experiencia:</strong> {entrenador.experiencia}
            </p>

            {entrenador.correo && (
              <p>
                <strong>Correo:</strong> {entrenador.correo}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Informacion;