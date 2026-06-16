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
  const [reasignaciones, setReasignaciones] = useState({});

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      setLoading(true);
      setError("");

      const clientesData = await getClients();
      const coachesData = await getCoaches();
      const citasData = await getAppointments();

      setClientes(clientesData);
      setEntrenadores(coachesData);
      setCitas(citasData);
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

  function abrirEditarCliente(cliente) {
    setClienteEditando({ ...cliente });
  }

  function abrirEditarCoach(coach) {
    setCoachEditando({ ...coach });
    setReasignaciones({});
  }

  function obtenerNombreCliente(clientId) {
    const cliente = clientes.find(
      (cliente) => Number(cliente.clientId) === Number(clientId)
    );

    return cliente?.fullName ?? `Cliente ID ${clientId}`;
  }

  function obtenerNombreCoach(coachId) {
    const coach = entrenadores.find(
      (coach) => Number(coach.coachId) === Number(coachId)
    );

    return coach?.fullName ?? `Coach ID ${coachId}`;
  }

  function obtenerFechaCita(cita) {
    const fecha =
      cita.date ??
      cita.appointmentDate ??
      cita.fecha ??
      cita.startDate ??
      "";

    if (!fecha) {
      return "Sin fecha";
    }

    try {
      return new Date(fecha).toLocaleDateString("es-CR");
    } catch {
      return fecha;
    }
  }

  function obtenerHoraCita(cita) {
    return (
      cita.time ??
      cita.appointmentTime ??
      cita.hora ??
      cita.startTime ??
      "Sin hora"
    );
  }

  function obtenerTemaCita(cita) {
    return cita.topic ?? cita.description ?? cita.tema ?? "Sin tema";
  }

  function obtenerEstadoCita(cita) {
    return cita.status ?? cita.estado ?? "Sin estado";
  }

  async function guardarCliente(event) {
    event.preventDefault();

    try {
      const clienteActualizado = { ...clienteEditando };

      if (!clienteActualizado.password?.trim()) {
        delete clienteActualizado.password;
      }

      await updateClient(clienteEditando.clientId, clienteActualizado);

      setClienteEditando(null);
      mostrarMensaje("Cliente actualizado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError(error.message || "No se pudo actualizar el cliente.");
    }
  }

  async function guardarCoach(event) {
    event.preventDefault();

    try {
      const coachActualizado = { ...coachEditando };

      if (!coachActualizado.password?.trim()) {
        delete coachActualizado.password;
      }

      await updateCoach(coachEditando.coachId, coachActualizado);

      setCoachEditando(null);
      mostrarMensaje("Entrenador actualizado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError(error.message || "No se pudo actualizar el entrenador.");
    }
  }

  async function reasignarCliente(cliente) {
    const nuevoCoachId = reasignaciones[cliente.clientId];

    if (!nuevoCoachId) {
      setError("Debes seleccionar un nuevo entrenador para reasignar el cliente.");
      return;
    }

    try {
      const clienteActualizado = {
        fullName: cliente.fullName,
        email: cliente.email,
        goal: cliente.goal,
        coachId: Number(nuevoCoachId),
      };

      await updateClient(cliente.clientId, clienteActualizado);

      setReasignaciones((actual) => {
        const copia = { ...actual };
        delete copia[cliente.clientId];
        return copia;
      });

      mostrarMensaje("Cliente reasignado correctamente.");
      await cargarDatos();
    } catch (error) {
      console.error(error);
      setError(error.message || "No se pudo reasignar el cliente.");
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
      setError(error.message || "No se pudo eliminar el cliente.");
    }
  }

  async function eliminarCoach(coachId) {
    const clientesAsignados = clientes.filter(
      (cliente) => Number(cliente.coachId) === Number(coachId)
    );

    if (clientesAsignados.length > 0) {
      setError(
        "No puedes eliminar este entrenador porque tiene clientes asignados. Primero entra en Editar y reasigna esos clientes a otro coach."
      );
      return;
    }

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
      setError(error.message || "No se pudo eliminar el entrenador.");
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

  const clientesDelCoachEditando = coachEditando
    ? clientes.filter(
        (cliente) => Number(cliente.coachId) === Number(coachEditando.coachId)
      )
    : [];

  const otrosCoaches = coachEditando
    ? entrenadores.filter(
        (coach) => Number(coach.coachId) !== Number(coachEditando.coachId)
      )
    : [];

  return (
    <section className="admin-page">
      <h2>Panel de administrador</h2>

      <p className="admin-descripcion">
        Desde esta página puedes administrar clientes, entrenadores y ver las
        citas registradas en FutureSkill Coach Lite.
      </p>

      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
      {error && <p className="admin-error">{error}</p>}

      <div className="admin-grid">
        <div className="admin-card">
          <h3>Clientes registrados</h3>

          <div className="admin-table-container">
            <table className="admin-table admin-table-clientes">
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
            <table className="admin-table admin-table-coaches">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Especialidad</th>
                  <th>Clientes asignados</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {entrenadores.length === 0 ? (
                  <tr>
                    <td colSpan="6">No hay entrenadores registrados.</td>
                  </tr>
                ) : (
                  entrenadores.map((coach) => {
                    const cantidadClientes = clientes.filter(
                      (cliente) =>
                        Number(cliente.coachId) === Number(coach.coachId)
                    ).length;

                    return (
                      <tr key={coach.coachId}>
                        <td>{coach.coachId}</td>
                        <td>{coach.fullName}</td>
                        <td>{coach.email}</td>
                        <td>{coach.specialty}</td>
                        <td>{cantidadClientes}</td>

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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h3>Citas registradas</h3>

          <div className="admin-table-container">
            <table className="admin-table admin-table-citas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Tema</th>
                  <th>Estado</th>
                  <th>Cliente</th>
                  <th>Entrenador</th>
                </tr>
              </thead>

              <tbody>
                {citas.length === 0 ? (
                  <tr>
                    <td colSpan="7">No hay citas registradas.</td>
                  </tr>
                ) : (
                  citas.map((cita) => (
                    <tr key={cita.appointmentId ?? cita.id}>
                      <td>{cita.appointmentId ?? cita.id}</td>
                      <td>{obtenerFechaCita(cita)}</td>
                      <td>{obtenerHoraCita(cita)}</td>
                      <td>{obtenerTemaCita(cita)}</td>
                      <td>{obtenerEstadoCita(cita)}</td>
                      <td>
                        {obtenerNombreCliente(cita.clientId ?? cita.clienteId)}
                      </td>
                      <td>
                        {obtenerNombreCoach(cita.coachId ?? cita.entrenadorId)}
                      </td>
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

            <label>Entrenador asignado</label>
            <select
              value={clienteEditando.coachId ?? ""}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  coachId: Number(e.target.value),
                })
              }
            >
              <option value="">Seleccione un entrenador</option>
              {entrenadores.map((coach) => (
                <option key={coach.coachId} value={coach.coachId}>
                  {coach.coachId} - {coach.fullName}
                </option>
              ))}
            </select>

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
          <form
            className="modal-admin modal-admin-grande"
            onSubmit={guardarCoach}
          >
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

            <div className="coach-clientes-asignados">
              <h4>Clientes asignados a este entrenador</h4>

              {clientesDelCoachEditando.length === 0 ? (
                <p className="sin-clientes-coach">
                  Este entrenador no tiene clientes asignados.
                </p>
              ) : (
                <>
                  <p className="nota-reasignacion">
                    Para poder eliminar este entrenador, primero mueve estos
                    clientes a otro coach.
                  </p>

                  <div className="lista-clientes-coach">
                    {clientesDelCoachEditando.map((cliente) => (
                      <div
                        className="cliente-coach-item"
                        key={cliente.clientId}
                      >
                        <div className="cliente-coach-info">
                          <strong>{cliente.fullName}</strong>
                          <span>{cliente.email}</span>
                          <small>Cliente ID: {cliente.clientId}</small>
                        </div>

                        <div className="cliente-coach-reasignar">
                          <select
                            value={reasignaciones[cliente.clientId] ?? ""}
                            onChange={(e) =>
                              setReasignaciones({
                                ...reasignaciones,
                                [cliente.clientId]: e.target.value,
                              })
                            }
                          >
                            <option value="">Mover a...</option>
                            {otrosCoaches.map((coach) => (
                              <option key={coach.coachId} value={coach.coachId}>
                                {coach.coachId} - {coach.fullName}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            className="btn-reasignar"
                            onClick={() => reasignarCliente(cliente)}
                          >
                            Mover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

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