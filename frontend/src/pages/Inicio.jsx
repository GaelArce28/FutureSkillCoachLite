import imagen1 from "../assets/1.jpeg";

function Inicio() {
  return (
    <>
      <section className="hero">
        <h2>Bienvenido a Future Skill Coach Lite</h2>
        <p>
          Mejora tus habilidades, revisa tu progreso y continúa aprendiendo
          desde un solo lugar.
        </p>

        <button>Comenzar</button>
      </section>

      <section className="cards">
        <div className="card">
          <img src={imagen1} alt="Cursos" className="card-bg" />

          <div className="card-overlay">
            <h3>Cursos</h3>
            <p>Explora cursos disponibles para mejorar tus conocimientos.</p>
          </div>
        </div>

        <div className="card">
          <h3>Progreso</h3>
          <p>Consulta tu avance dentro de la plataforma.</p>
        </div>

        <div className="card">
          <h3>Perfil</h3>
          <p>Administra tu información de usuario.</p>
        </div>
      </section>
    </>
  );
}

export default Inicio;