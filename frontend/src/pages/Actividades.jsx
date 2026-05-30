import { useEffect, useState } from 'react'

function Cursos() {
  const [entrenamientos, setEntrenamientos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Esta linea sirve para trae los datos desde el back end
  useEffect(() => {
    fetch('https://localhost:5001/api/entrenamientos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar los entrenamientos')
        }

        return response.json()
      })
      
      .then((data) => {
        setEntrenamientos(data)
        setCargando(false)
      })
      .catch((error) => {
        setError(error.message)
        setCargando(false)
      })
  }, [])

  if (cargando) {
    return (
      <section className="cursos-page">
        <h2>Entrenamientos</h2>
        <p>Cargando entrenamientos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="cursos-page">
        <h2>Entrenamientos</h2>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className="cursos-page">
      <h2>Entrenamientos</h2>
      <p>Aquí se mostrarán los entrenamientos disponibles.</p>

      <div className="ficha-entrenamientos">
        <div className="fila encabezado">
          <div>Actividad</div>
          <div>Hora</div>
          <div>Entrenador</div>
        </div>

        {entrenamientos.map((item, index) => (
          <div className="fila" key={index}>
            <div>{item.actividad}</div>
            <div>{item.hora}</div>
            <div>{item.entrenador}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Cursos