import { useState } from 'react'
import '../App.css'

const ESTADOS = ['Pending', 'Confirmed', 'Cancelled', 'Completed']

const estadoColor = {
  Pending: '#f59e0b',
  Confirmed: '#2563eb',
  Cancelled: '#ef4444',
  Completed: '#10b981',
}

let nextId = 1

function Citas() {
  const [citas, setCitas] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [citaEditando, setCitaEditando] = useState(null)
  const [confirmEliminar, setConfirmEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const [form, setForm] = useState({
    date: '',
    time: '',
    topic: '',
    status: 'Pending',
    clientId: '',
    coachId: '',
  })

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo })
    setTimeout(() => setMensaje(null), 3500)
  }

  const abrirCrear = () => {
    setCitaEditando(null)
    setForm({ date: '', time: '', topic: '', status: 'Pending', clientId: '', coachId: '' })
    setMostrarFormulario(true)
  }

  const abrirEditar = (cita) => {
    setCitaEditando(cita)
    setForm({
      date: cita.date,
      time: cita.time,
      topic: cita.topic,
      status: cita.status,
      clientId: cita.clientId,
      coachId: cita.coachId,
    })
    setMostrarFormulario(true)
  }

  const cerrarFormulario = () => {
    setMostrarFormulario(false)
    setCitaEditando(null)
  }

  const handleSubmit = () => {
    if (!form.date || !form.time || !form.topic || !form.clientId || !form.coachId) {
      mostrarMensaje('Por favor completa todos los campos', 'error')
      return
    }

    if (citaEditando) {
      // Editar en memoria
      setCitas((prev) =>
        prev.map((c) =>
          c.appointmentId === citaEditando.appointmentId
            ? { ...c, ...form, clientId: Number(form.clientId), coachId: Number(form.coachId) }
            : c
        )
      )
      mostrarMensaje('Cita actualizada ✓')
    } else {
      // Crear en memoria
      const nueva = {
        appointmentId: nextId++,
        date: form.date,
        time: form.time,
        topic: form.topic,
        status: form.status,
        clientId: Number(form.clientId),
        coachId: Number(form.coachId),
        clientName: `Cliente ${form.clientId}`,
        coachName: `Coach ${form.coachId}`,
      }
      setCitas((prev) => [...prev, nueva])
      mostrarMensaje('Cita creada exitosamente ✓')
    }

    cerrarFormulario()
  }

  const eliminarCita = (id) => {
    setCitas((prev) => prev.filter((c) => c.appointmentId !== id))
    setConfirmEliminar(null)
    mostrarMensaje('Cita eliminada ✓')
  }

  const cambiarEstado = (cita, nuevoEstado) => {
    setCitas((prev) =>
      prev.map((c) => (c.appointmentId === cita.appointmentId ? { ...c, status: nuevoEstado } : c))
    )
    mostrarMensaje(`Estado cambiado a "${nuevoEstado}" ✓`)
  }

  return (
    <section className="citas-page">
      <div className="citas-header">
        <div>
          <h2>Gestión de Citas</h2>
          <p className="citas-subtitulo">Crea, edita, elimina y cambia el estado de las citas</p>
        </div>
        <button className="btn-crear" onClick={abrirCrear}>
          + Nueva Cita
        </button>
      </div>

      {mensaje && (
        <div className={`toast toast-${mensaje.tipo}`}>{mensaje.texto}</div>
      )}

      <div className="tabla-wrapper">
        {citas.length === 0 ? (
          <div className="tabla-vacia">
            <p>No hay citas registradas.</p>
            <p className="tabla-vacia-sub">Presiona <strong>+ Nueva Cita</strong> para agregar una.</p>
          </div>
        ) : (
          <table className="tabla-citas">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tema</th>
                <th>Cliente</th>
                <th>Coach</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.appointmentId}>
                  <td>{cita.appointmentId}</td>
                  <td>{cita.date}</td>
                  <td>{cita.time}</td>
                  <td>{cita.topic}</td>
                  <td>{cita.clientName}</td>
                  <td>{cita.coachName}</td>
                  <td>
                    <select
                      className="select-estado"
                      value={cita.status}
                      style={{ borderColor: estadoColor[cita.status] ?? '#ccc', color: estadoColor[cita.status] ?? '#222' }}
                      onChange={(e) => cambiarEstado(cita, e.target.value)}
                    >
                      {ESTADOS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="acciones">
                    <button className="btn-editar" onClick={() => abrirEditar(cita)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => setConfirmEliminar(cita.appointmentId)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal formulario */}
      {mostrarFormulario && (
        <div className="modal-backdrop" onClick={cerrarFormulario}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{citaEditando ? 'Editar Cita' : 'Nueva Cita'}</h3>

            <label>Fecha</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />

            <label>Hora</label>
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />

            <label>Tema</label>
            <input type="text" placeholder="Ej: Nutrición deportiva" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />

            <label>ID Cliente</label>
            <input type="number" placeholder="ID del cliente" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} />

            <label>ID Coach</label>
            <input type="number" placeholder="ID del coach" value={form.coachId} onChange={(e) => setForm({ ...form, coachId: e.target.value })} />

            <label>Estado</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="modal-botones">
              <button className="btn-cancelar" onClick={cerrarFormulario}>Cancelar</button>
              <button className="btn-guardar" onClick={handleSubmit}>
                {citaEditando ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {confirmEliminar && (
        <div className="modal-backdrop" onClick={() => setConfirmEliminar(null)}>
          <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
            <h3>¿Eliminar cita?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={() => setConfirmEliminar(null)}>Cancelar</button>
              <button className="btn-eliminar-confirm" onClick={() => eliminarCita(confirmEliminar)}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Citas
