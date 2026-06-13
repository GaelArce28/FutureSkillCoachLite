import "../App.css";

function Actividades() {
  const actividades = [
    {
      id: 1,
      nombre: "Musculación y fuerza",
      descripcion:
        "Entrenamiento enfocado en ejercicios con peso, máquinas o resistencia corporal.",
      beneficio:
        "Ayuda a aumentar la fuerza muscular, mejorar la postura y fortalecer las articulaciones.",
    },
    {
      id: 2,
      nombre: "Cardio",
      descripcion:
        "Actividades como correr, bicicleta, caminadora o ejercicios de resistencia.",
      beneficio:
        "Mejora la resistencia física, la salud cardiovascular y la capacidad respiratoria.",
    },
    {
      id: 3,
      nombre: "Entrenamiento funcional",
      descripcion:
        "Ejercicios que combinan fuerza, equilibrio, coordinación y movimientos del día a día.",
      beneficio:
        "Ayuda a mejorar la movilidad, la estabilidad y el control del cuerpo.",
    },
    {
      id: 4,
      nombre: "Flexibilidad y movilidad",
      descripcion:
        "Ejercicios de estiramiento, movilidad articular y control muscular.",
      beneficio:
        "Ayuda a reducir la tensión muscular, mejorar el rango de movimiento y prevenir lesiones.",
    },
    {
      id: 5,
      nombre: "Entrenamiento de resistencia",
      descripcion:
        "Rutinas diseñadas para mantener actividad física durante más tiempo sin agotarse rápidamente.",
      beneficio:
        "Mejora la condición física general, la energía y la capacidad de esfuerzo.",
    },
    {
      id: 6,
      nombre: "Entrenamiento personalizado",
      descripcion:
        "Rutinas adaptadas al objetivo, condición física y nivel de cada persona.",
      beneficio:
        "Permite avanzar de forma más segura y ordenada según las necesidades del cliente.",
    },
  ];

  return (
    <section className="actividades-page">
      <div className="actividades-header">
        <h2>Actividades</h2>

        <p>
          Conozca los diferentes tipos de actividades disponibles y cómo ayudan
          al desarrollo físico.
        </p>
      </div>

      <div className="actividades-grid">
        {actividades.map((actividad) => (
          <article className="actividad-card" key={actividad.id}>
            <h3>{actividad.nombre}</h3>

            <p>
              <strong>Descripción:</strong> {actividad.descripcion}
            </p>

            <p>
              <strong>Beneficio físico:</strong> {actividad.beneficio}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Actividades;