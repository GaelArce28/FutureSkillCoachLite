import { useState } from "react";

function Informacion() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [entrenadores, setEntrenadores] = useState([
    {
      id: 1,
      nombre: "Carlos Ramírez",
      actividad: "Musculación y fuerza",
      horario: "Lunes a Viernes - 6:00 a.m. a 12:00 p.m.",
      experiencia: "5 años de experiencia",
    },
    {
      id: 2,
      nombre: "María Fernanda López",
      actividad: "Funcional y cardio",
      horario: "Lunes, Miércoles y Viernes - 4:00 p.m. a 8:00 p.m.",
      experiencia: "4 años de experiencia",
    },
    {
      id: 3,
      nombre: "José Vargas",
      actividad: "Cross training",
      horario: "Martes y Jueves - 5:00 p.m. a 9:00 p.m.",
      experiencia: "6 años de experiencia",
    },
    {
      id: 4,
      nombre: "Andrés Mora",
      actividad: "Entrenamiento personalizado",
      horario: "Sábados - 7:00 a.m. a 1:00 p.m.",
      experiencia: "3 años de experiencia",
    },
  ]);

  const [nuevoEntrenador, setNuevoEntrenador] = useState({
    nombre: "",
    actividad: "",
    horario: "",
    experiencia: "",
  });

  const cambiarDato = (e) => {
    const { name, value } = e.target;

    setNuevoEntrenador({
      ...nuevoEntrenador,
      [name]: value,
    });
  };

  const agregarEntrenador = (e) => {
    e.preventDefault();

    const entrenador = {
      id: entrenadores.length + 1,
      ...nuevoEntrenador,
    };

    setEntrenadores([...entrenadores, entrenador]);

    setNuevoEntrenador({
      nombre: "",
      actividad: "",
      horario: "",
      experiencia: "",
    });

    setMostrarFormulario(false);
  };

  return (
    <section className="informacion">
      <div className="info-header">
        <h2>Entrenadores</h2>
        <p>Información sobre nuestros entrenadores y sus actividades.</p>

        <button
          className="btn-agregar"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "Agregar entrenador"}
        </button>
      </div>

      {mostrarFormulario && (
        <form className="form-entrenador" onSubmit={agregarEntrenador}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del entrenador"
            value={nuevoEntrenador.nombre}
            onChange={cambiarDato}
            required
          />

          <input
            type="text"
            name="actividad"
            placeholder="Actividad que realiza"
            value={nuevoEntrenador.actividad}
            onChange={cambiarDato}
            required
          />

          <input
            type="text"
            name="horario"
            placeholder="Horario"
            value={nuevoEntrenador.horario}
            onChange={cambiarDato}
            required
          />

          <input
            type="text"
            name="experiencia"
            placeholder="Experiencia"
            value={nuevoEntrenador.experiencia}
            onChange={cambiarDato}
            required
          />

          <button type="submit">Guardar entrenador</button>
        </form>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default Informacion;