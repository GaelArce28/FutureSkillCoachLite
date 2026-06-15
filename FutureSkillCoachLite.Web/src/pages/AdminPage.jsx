import { useEffect, useState } from "react";
import {
  getClients,
  updateClient,
  deleteClient,
} from "../api/clientApi";
import {
  getCoaches,
  updateCoach,
  deleteCoach,
} from "../api/coachApi";
import { getAppointments } from "../api/appointmentApi";
import "../App.css";

function AdminPage() {
  const [clientes, setClientes] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);
  const [citas, setCitas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const [clienteEditando, setClienteEditando] = useState(null);
  const [coachEditando, setCoachEditando] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      setLoading(true);
      setError("");

      const [clientesData, coachesData, citasData] = await Promise.all([
        getClients(),
        getCoaches(),
        getAppointments(),
      ]);

      setClientes(clientesData ?? []);
      setEntrenadores(coachesData ?? []);
      setCitas(citasData ?? []);
    } catch (error) {
      console.error(error);
      setError("Error al cargar la información del administrador.");
    } finally {
      setLoading(false);
    }
  }

  function mostrarMensaje(texto) {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 3000);
  }

  function obtenerNombreCliente(cita) {
    if (cita.clientName) {
      return cita.clientName;
    }

    const cliente = clientes.find(
      (cliente) => cliente.clientId === Number(cita.clientId)
    );

    return cliente ? cliente.fullName : `Cliente ID ${cita.clientId}`;
  }

  function obtenerNombreCoach(cita) {
    if (cita.coachName) {
      return cita.coachName;
    }

    const coach = entrenadores.find(
      (coach) => coach.coachId === Number(cita.coachId)
    );

    return coach ? coach.fullName : `Coach ID ${cita.coachId}`;
  }

  function formatearHora(hora) {
    if (!hora) {
      return "Sin hora";
    }

    return hora.toString().substring(0, 5);
  }

  function abrirEditarCliente(cliente) {
    setClienteEditando({ ...cliente });
  }

  function abrirEditarCoach(coach) {
    setCoachEditando({ ...coach });
  }

  async function guardarCliente(event) {
    event.preventDefault();

    try {
      await updateClient(clienteEditando.clientId, clienteEditando);
      setClienteEditando(null);
      mostrarMensaje("Cliente actualizado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el cliente.");
    }
  }

  async function guardarCoach(event) {
    event.preventDefault();

    try {
      await updateCoach(coachEditando.coachId, coachEditando);
      setCoachEditando(null);
      mostrarMensaje("Entrenador actualizado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el entrenador.");
    }
  }

  async function eliminarCliente(clientId) {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este cliente?");

    if (!confirmar) return;

    try {
      await deleteClient(clientId);
      mostrarMensaje("Cliente eliminado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el cliente.");
    }
  }

  async function eliminarCoach(coachId) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este entrenador?"
    );

    if (!confirmar) return;

    try {
      await deleteCoach(coachId);
      mostrarMensaje("Entrenador eliminado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el entrenador.");
    }
  }

  if (loading) {
    return (
      <section className="admin-page">
        <h2>Panel de administrador</h2>
        <p>Cargando información...</p>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <h2>Panel de administrador</h2>

      <p className="admin-descripcion">
        Desde esta página puedes administrar clientes, entrenadores y citas
        registradas en FutureSkill Coach Lite.
      </p>

      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
      {error && <p className="admin-error">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>Clientes registrados</h3>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Objetivo</th>
                  <th>Coach ID</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan="6">No hay clientes registrados.</td>
                  </tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr key={cliente.clientId}>
                      <td>{cliente.clientId}</td>
                      <td>{cliente.fullName}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.goal}</td>
                      <td>{cliente.coachId}</td>

                      <td className="admin-acciones-td">
                        <div className="admin-acciones">
                          <button
                            className="btn-editar"
                            onClick={() => abrirEditarCliente(cliente)}
                          >
                            Editar
                          </button>

                          <button
                            className="btn-eliminar"
                            onClick={() => eliminarCliente(cliente.clientId)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h3>Entrenadores registrados</h3>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {entrenadores.length === 0 ? (
                  <tr>
                    <td colSpan="5">No hay entrenadores registrados.</td>
                  </tr>
                ) : (
                  entrenadores.map((coach) => (
                    <tr key={coach.coachId}>
                      <td>{coach.coachId}</td>
                      <td>{coach.fullName}</td>
                      <td>{coach.email}</td>
                      <td>{coach.specialty}</td>

                      <td className="admin-acciones-td">
                        <div className="admin-acciones">
                          <button
                            className="btn-editar"
                            onClick={() => abrirEditarCoach(coach)}
                          >
                            Editar
                          </button>

                          <button
                            className="btn-eliminar"
                            onClick={() => eliminarCoach(coach.coachId)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h3>Citas agendadas</h3>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Tema</th>
                  <th>Estado</th>
                  <th>Cliente</th>
                  <th>Coach</th>
                  <th>Cliente ID</th>
                  <th>Coach ID</th>
                </tr>
              </thead>

              <tbody>
                {citas.length === 0 ? (
                  <tr>
                    <td colSpan="9">No hay citas agendadas.</td>
                  </tr>
                ) : (
                  citas.map((cita) => (
                    <tr key={cita.appointmentId}>
                      <td>{cita.appointmentId}</td>
                      <td>{cita.date}</td>
                      <td>{formatearHora(cita.time)}</td>
                      <td>{cita.topic}</td>
                      <td>{cita.status}</td>
                      <td>{obtenerNombreCliente(cita)}</td>
                      <td>{obtenerNombreCoach(cita)}</td>
                      <td>{cita.clientId}</td>
                      <td>{cita.coachId}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {clienteEditando && (
        <div className="modal-fondo">
          <form className="modal-admin" onSubmit={guardarCliente}>
            <h3>Editar cliente</h3>

            <label>Nombre completo</label>
            <input
              type="text"
              value={clienteEditando.fullName ?? ""}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  fullName: e.target.value,
                })
              }
            />

            <label>Email</label>
            <input
              type="email"
              value={clienteEditando.email ?? ""}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  email: e.target.value,
                })
              }
            />

            <label>Objetivo</label>
            <input
              type="text"
              value={clienteEditando.goal ?? ""}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  goal: e.target.value,
                })
              }
            />

            <label>ID del entrenador</label>
            <input
              type="number"
              value={clienteEditando.coachId ?? ""}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  coachId: Number(e.target.value),
                })
              }
            />

            <div className="modal-botones">
              <button type="submit" className="btn-guardar">
                Guardar cambios
              </button>

              <button
                type="button"
                className="btn-cancelar"
                onClick={() => setClienteEditando(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {coachEditando && (
        <div className="modal-fondo">
          <form className="modal-admin" onSubmit={guardarCoach}>
            <h3>Editar entrenador</h3>

            <label>Nombre completo</label>
            <input
              type="text"
              value={coachEditando.fullName ?? ""}
              onChange={(e) =>
                setCoachEditando({
                  ...coachEditando,
                  fullName: e.target.value,
                })
              }
            />

            <label>Email</label>
            <input
              type="email"
              value={coachEditando.email ?? ""}
              onChange={(e) =>
                setCoachEditando({
                  ...coachEditando,
                  email: e.target.value,
                })
              }
            />

            <label>Especialidad</label>
            <input
              type="text"
              value={coachEditando.specialty ?? ""}
              onChange={(e) =>
                setCoachEditando({
                  ...coachEditando,
                  specialty: e.target.value,
                })
              }
            />

            <div className="modal-botones">
              <button type="submit" className="btn-guardar">
                Guardar cambios
              </button>

              <button
                type="button"
                className="btn-cancelar"
                onClick={() => setCoachEditando(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default AdminPage;