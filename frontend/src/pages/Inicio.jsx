import { Link } from "react-router-dom";
import imagen1 from "../assets/1.jpeg";
import actividad from "../assets/actividad.jpeg";
import perfil from "../assets/perfil.jpeg";
import Perfil from "./Perfil";

function Inicio() {
  return (
    <>
      <section className="hero">
        <h2>Bienvenido a Future Skill Coach Lite</h2>
        <p>
          Mejora tus habilidades, revisa tu progreso y continúa esforzándote.
        </p>

        <button>Comenzar</button>
      </section>

      <section className="cards">
        <Link to="/actividades" className="card">
          <img src={imagen1} alt="Actividades" className="card-bg" />

          <div className="card-overlay">
            <h3>Actividades</h3>
            <p>
              Explora las actividades disponibles para mejorar tu condición
              física.
            </p>
          </div>
        </Link>

        <Link to="/informacion" className="card">
          <img src={actividad} alt="Información" className="card-bg" />

          <div className="card-overlay">
            <h3>Información</h3>
            <p>
              Información sobre nuestras actividades, entrenadores y servicios.
            </p>
          </div>
        </Link>

        <Link to="/perfil" className="card">
          <img src={perfil} alt="Perfil" className="card-bg" />

          <div className="card-overlay">
            <h3>Perfil</h3>
            <p>
              Administra tu información de usuario.
            </p>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Inicio;