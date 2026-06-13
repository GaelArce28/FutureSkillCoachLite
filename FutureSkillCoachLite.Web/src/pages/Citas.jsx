import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cancelAppointment,
  createAppointment,
  getAppointments,
  updateAppointment,
} from "../api/appointmentApi";
import { getClients } from "../api/clientApi";
import { getCoaches } from "../api/coachApi";
import { getCurrentUser } from "../auth/session";
import "../App.css";

function Citas() {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    topic: "",
    status: "Pending",
    clientId: "",
    coachId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      navigate("/login");
      return;
    }

    loadInitialData(user);
  }, [navigate]);

  async function loadInitialData(user) {
    try {
      setLoading(true);
      setErrorMessage("");

      const [appointmentsData, clientsData, coachesData] = await Promise.all([
        getAppointments(),
        getClients(),
        getCoaches(),
      ]);

      setClients(clientsData);
      setCoaches(coachesData);

      const filteredAppointments = filterAppointmentsByUser(
        appointmentsData,
        user
      );

      setAppointments(filteredAppointments);
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar las citas.");
    } finally {
      setLoading(false);
    }
  }

  function getRole(user) {
    return user.role || user.rol || user.userRole;
  }

  function getUserClientId(user) {
    return user.clientId || user.ClientId || user.id || user.Id;
  }

  function getUserCoachId(user) {
    return user.coachId || user.CoachId || user.id || user.Id;
  }

  function isClient(user) {
    const role = getRole(user);
    return role === "Client" || role === "client";
  }

  function isCoach(user) {
    const role = getRole(user);
    return role === "Coach" || role === "coach";
  }

  function filterAppointmentsByUser(appointmentsData, user) {
    if (isClient(user)) {
      const clientId = Number(getUserClientId(user));

      return appointmentsData.filter(
        (appointment) => appointment.clientId === clientId
      );
    }

    if (isCoach(user)) {
      const coachId = Number(getUserCoachId(user));

      return appointmentsData.filter(
        (appointment) => appointment.coachId === coachId
      );
    }

    return appointmentsData;
  }

  function getCoachName(coachId) {
    const coach = coaches.find(
      (coachItem) => coachItem.coachId === Number(coachId)
    );

    return coach ? coach.fullName : coachId;
  }

  function getClientName(clientId) {
    const client = clients.find(
      (clientItem) => clientItem.clientId === Number(clientId)
    );

    return client ? client.fullName : clientId;
  }

  function normalizeDateForInput(date) {
    if (!date) {
      return "";
    }

    return date.substring(0, 10);
  }

  function normalizeTimeForInput(time) {
    if (!time) {
      return "";
    }

    return time.substring(0, 5);
  }

  function normalizeTimeForApi(time) {
    if (!time) {
      return "";
    }

    return time.length === 5 ? `${time}:00` : time;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function openCreateForm() {
    const user = getCurrentUser();

    if (!user) {
      navigate("/login");
      return;
    }

    if (isCoach(user)) {
      return;
    }

    if (isClient(user)) {
      setFormData({
        date: "",
        time: "",
        topic: "",
        status: "Pending",
        clientId: getUserClientId(user),
        coachId: "",
      });
    } else {
      setFormData({
        date: "",
        time: "",
        topic: "",
        status: "Pending",
        clientId: "",
        coachId: "",
      });
    }

    setEditingAppointment(null);
    setShowForm(true);
    setErrorMessage("");
    setSuccessMessage("");
  }

  function openEditForm(appointment) {
    const user = getCurrentUser();

    if (user && isCoach(user)) {
      return;
    }

    setEditingAppointment(appointment);

    setFormData({
      date: normalizeDateForInput(appointment.date),
      time: normalizeTimeForInput(appointment.time),
      topic: appointment.topic,
      status: appointment.status,
      clientId: appointment.clientId,
      coachId: appointment.coachId,
    });

    setShowForm(true);
    setErrorMessage("");
    setSuccessMessage("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingAppointment(null);

    setFormData({
      date: "",
      time: "",
      topic: "",
      status: "Pending",
      clientId: "",
      coachId: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const user = getCurrentUser();

    if (user && isCoach(user)) {
      setErrorMessage("El coach solo puede cancelar citas.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.date ||
      !formData.time ||
      !formData.topic.trim() ||
      !formData.clientId ||
      !formData.coachId
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      setSaving(true);

      const appointmentToSave = {
        date: formData.date,
        time: normalizeTimeForApi(formData.time),
        topic: formData.topic.trim(),
        status: formData.status || "Pending",
        clientId: Number(formData.clientId),
        coachId: Number(formData.coachId),
      };

      if (editingAppointment) {
        await updateAppointment(
          editingAppointment.appointmentId,
          appointmentToSave
        );

        setSuccessMessage("Cita modificada correctamente.");
      } else {
        await createAppointment(appointmentToSave);
        setSuccessMessage("Cita registrada correctamente.");
      }

      closeForm();

      const currentUser = getCurrentUser();
      await loadInitialData(currentUser);
    } catch (error) {
      setErrorMessage(error.message || "Error al guardar la cita.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCancelAppointment(appointment) {
    const confirmCancel = window.confirm(
      "¿Seguro que desea cancelar esta cita?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await cancelAppointment(appointment);

      setSuccessMessage("Cita cancelada correctamente.");

      const user = getCurrentUser();
      await loadInitialData(user);
    } catch (error) {
      setErrorMessage(error.message || "Error al cancelar la cita.");
    }
  }

  const currentUser = getCurrentUser();
  const currentUserIsClient = currentUser ? isClient(currentUser) : false;
  const currentUserIsCoach = currentUser ? isCoach(currentUser) : false;

  return (
    <section className="citas-page">
      <div className="citas-header">
        <div>
          <h2>Consultar Citas</h2>

          <p className="citas-subtitulo">
            {currentUserIsCoach
              ? "Visualice sus citas asignadas y cancele las que correspondan."
              : "Visualice las citas registradas y su información principal."}
          </p>
        </div>

        {!currentUserIsCoach && (
          <button type="button" className="btn-crear" onClick={openCreateForm}>
            Agregar cita
          </button>
        )}
      </div>

      {errorMessage && <div className="toast toast-error">{errorMessage}</div>}

      {successMessage && (
        <div className="toast toast-success">{successMessage}</div>
      )}

      <div className="tabla-wrapper">
        {loading ? (
          <div className="tabla-vacia">
            <p>Cargando citas...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="tabla-vacia">
            <p>No hay citas registradas.</p>
          </div>
        ) : (
          <table className="tabla-citas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tema</th>
                <th>Estado</th>
                <th>Cliente</th>
                <th>Coach</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.topic}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.clientName ||
                      getClientName(appointment.clientId)}
                  </td>
                  <td>
                    {appointment.coachName || getCoachName(appointment.coachId)}
                  </td>
                  <td>
                    <div className="acciones">
                      {!currentUserIsCoach && (
                        <button
                          type="button"
                          className="btn-editar"
                          onClick={() => openEditForm(appointment)}
                        >
                          Modificar
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn-eliminar"
                        onClick={() => handleCancelAppointment(appointment)}
                        disabled={appointment.status === "Cancelled"}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && !currentUserIsCoach && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={handleSubmit}>
            <h3>{editingAppointment ? "Modificar cita" : "Agregar cita"}</h3>

            <label>
              Fecha
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>

            <label>
              Hora
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </label>

            <label>
              Tema
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Ejemplo: Evaluación inicial, cardio, fuerza..."
              />
            </label>

            {!currentUserIsClient && (
              <label>
                Cliente
                <select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un cliente</option>

                  {clients.map((client) => (
                    <option key={client.clientId} value={client.clientId}>
                      {client.fullName}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              Entrenador
              <select
                name="coachId"
                value={formData.coachId}
                onChange={handleChange}
              >
                <option value="">Seleccione un entrenador</option>

                {coaches.map((coach) => (
                  <option key={coach.coachId} value={coach.coachId}>
                    {coach.fullName} - {coach.specialty}
                  </option>
                ))}
              </select>
            </label>

            {editingAppointment && (
              <label>
                Estado
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>
            )}

            <div className="modal-botones">
              <button
                type="button"
                className="btn-cancelar"
                onClick={closeForm}
              >
                Cerrar
              </button>

              <button type="submit" className="btn-guardar" disabled={saving}>
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Citas;