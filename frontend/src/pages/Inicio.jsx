import { Link } from "react-router-dom";
import imagen1 from "../assets/1.jpeg";
import actividad from "../assets/actividad.jpeg";
import baner from "../assets/baner.png";
import perfil from "../assets/perfil.jpeg";

function Inicio() {
  return (
    <>
      <section
        className="hero"
        style={{backgroundImage: `url(${baner})`,
        }}
      >
      


      
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
              Información sobre nuestros entrenadores.
            </p>
          </div>
        </Link>

        <Link to="/perfil" className="card">
          <img src={perfil} alt="Perfil" className="card-bg" />

          <div className="card-overlay">
            <h3>Perfil</h3>
            <p>Administra tu información de usuario.</p>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Inicio;