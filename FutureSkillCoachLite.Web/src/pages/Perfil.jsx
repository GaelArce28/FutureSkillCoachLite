import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteClient, getClients, updateClient } from "../api/clientApi";
import { getCoaches } from "../api/coachApi";
import "../App.css";

function Perfil() {
  const [cliente, setCliente] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    goal: "",
    coachId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    cargarPerfil();
  }, []);

  async function cargarPerfil() {
    try {
      setLoading(true);
      setErrorMessage("");

      const userData = localStorage.getItem("usuario");

      if (!userData) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(userData);
      const clientId = user.clientId || user.ClientId || user.id || user.Id;

      if (!clientId) {
        setErrorMessage("No se encontró el ID del cliente logueado.");
        return;
      }

      const [clientsData, coachesData] = await Promise.all([
        getClients(),
        getCoaches(),
      ]);

      const clienteEncontrado = clientsData.find(
        (client) => client.clientId === Number(clientId)
      );

      if (!clienteEncontrado) {
        setErrorMessage("No se encontró la información del cliente.");
        return;
      }

      setCliente(clienteEncontrado);
      setCoaches(coachesData);

      setFormData({
        fullName: clienteEncontrado.fullName || "",
        email: clienteEncontrado.email || "",
        goal: clienteEncontrado.goal || "",
        coachId: clienteEncontrado.coachId || "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Error al cargar el perfil.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getCoachName(coachId) {
    const coach = coaches.find(
      (coachItem) => coachItem.coachId === Number(coachId)
    );

    return coach ? `${coach.fullName} - ${coach.specialty}` : "No asignado";
  }

  function cancelarEdicion() {
    if (!cliente) {
      return;
    }

    setFormData({
      fullName: cliente.fullName || "",
      email: cliente.email || "",
      goal: cliente.goal || "",
      coachId: cliente.coachId || "",
    });

    setEditando(false);
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function guardarCambios(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.goal.trim() ||
      !formData.coachId
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Ingrese un correo electrónico válido.");
      return;
    }

    try {
      setSaving(true);

      const clienteActualizado = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        goal: formData.goal.trim(),
        coachId: Number(formData.coachId),
      };

      await updateClient(cliente.clientId, clienteActualizado);

      const usuarioActual = JSON.parse(localStorage.getItem("usuario"));

      const usuarioActualizado = {
        ...usuarioActual,
        fullName: clienteActualizado.fullName,
        email: clienteActualizado.email,
        goal: clienteActualizado.goal,
        coachId: clienteActualizado.coachId,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      setSuccessMessage("Perfil actualizado correctamente.");
      setEditando(false);

      await cargarPerfil();
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  }

  async function eliminarPerfil() {
    const confirmar = window.confirm(
      "¿Seguro que desea eliminar su perfil? Esta acción no se puede deshacer."
    );

    if (!confirmar) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await deleteClient(cliente.clientId);

      localStorage.removeItem("usuario");

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Error al eliminar el perfil.");
    }
  }

  if (loading) {
    return (
      <section className="perfil-page">
        <h2>Mi perfil</h2>
        <p className="perfil-subtitulo">Cargando perfil...</p>
      </section>
    );
  }

  if (!cliente) {
    return (
      <section className="perfil-page">
        <h2>Mi perfil</h2>
        {errorMessage && <div className="alert error">{errorMessage}</div>}
      </section>
    );
  }

  return (
    <section className="perfil-page">
      <h2>Mi perfil</h2>

      <p className="perfil-subtitulo">
        Consulte y administre la información de su cuenta.
      </p>

      {errorMessage && <div className="alert error">{errorMessage}</div>}
      {successMessage && <div className="alert success">{successMessage}</div>}

      <div className="perfil-card">
        <div className="perfil-avatar">
          {cliente.fullName ? cliente.fullName.charAt(0).toUpperCase() : "C"}
        </div>

        {!editando ? (
          <>
            <h3>{cliente.fullName}</h3>

            <div className="perfil-info">
              <p>
                <strong>Correo:</strong> {cliente.email}
              </p>

              <p>
                <strong>Objetivo:</strong> {cliente.goal}
              </p>

              <p>
                <strong>Coach asignado:</strong> {getCoachName(cliente.coachId)}
              </p>
            </div>

            <div className="perfil-acciones">
              <button
                type="button"
                className="perfil-btn"
                onClick={() => setEditando(true)}
              >
                Modificar perfil
              </button>

              <button
                type="button"
                className="perfil-btn-eliminar"
                onClick={eliminarPerfil}
              >
                Eliminar perfil
              </button>
            </div>
          </>
        ) : (
          <form className="perfil-form" onSubmit={guardarCambios}>
            <label>
              Nombre completo
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Objetivo
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
              />
            </label>

            <label>
              Coach asignado
              <select
                name="coachId"
                value={formData.coachId}
                onChange={handleChange}
              >
                <option value="">Seleccione un coach</option>

                {coaches.map((coach) => (
                  <option key={coach.coachId} value={coach.coachId}>
                    {coach.fullName} - {coach.specialty}
                  </option>
                ))}
              </select>
            </label>

            <p className="perfil-nota">
              Al cambiar el coach asignado, las nuevas citas pueden relacionarse
              con el nuevo entrenador seleccionado.
            </p>

            <div className="perfil-acciones">
              <button type="submit" className="perfil-btn" disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>

              <button
                type="button"
                className="perfil-btn-secundario"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Perfil;