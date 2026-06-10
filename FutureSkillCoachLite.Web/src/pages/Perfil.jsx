import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCoaches } from "../api/coachApi";
import { updateClient, deleteClient } from "../api/clientApi";
import "../App.css";

function leerLocalStorage(clave, valorDefecto = null) {
  const valor = localStorage.getItem(clave);

  if (!valor || valor === "undefined" || valor === "null") {
    return valorDefecto;
  }

  try {
    return JSON.parse(valor);
  } catch (error) {
    console.error(`Error leyendo ${clave} desde localStorage:`, error);
    localStorage.removeItem(clave);
    return valorDefecto;
  }
}

function Perfil() {
  const navigate = useNavigate();

  const clienteGuardado = leerLocalStorage("cliente", null);
  const usuarioGuardado = leerLocalStorage("usuario", null);

  const clienteInicial = clienteGuardado || usuarioGuardado || {};
  const usuarioInicial = usuarioGuardado || clienteInicial || {};

  const [cliente, setCliente] = useState(clienteInicial);
  const [coachNombre, setCoachNombre] = useState("No disponible");
  const [editando, setEditando] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: clienteInicial.fullName || clienteInicial.nombre || "",
    email: clienteInicial.email || clienteInicial.correo || "",
    goal: clienteInicial.goal || clienteInicial.objetivo || "",
    coachId: clienteInicial.coachId || "",
  });

  const clienteId = cliente.clientId || cliente.id || null;

  const rolUsuario = String(
    usuarioInicial.role ||
      usuarioInicial.rol ||
      usuarioInicial.userRole ||
      "Client"
  );

  const esAdmin =
    rolUsuario.toLowerCase() === "admin" ||
    rolUsuario.toLowerCase() === "administrator";

  const usuarioClientId =
    usuarioInicial.clientId ||
    usuarioInicial.id ||
    clienteId;

  const esPropietario =
    clienteId && String(usuarioClientId) === String(clienteId);

  const puedeModificar = esAdmin || esPropietario;

  useEffect(() => {
    cargarNombreCoach();
  }, [cliente.coachId]);

  async function cargarNombreCoach() {
    try {
      if (!cliente.coachId) {
        setCoachNombre("No disponible");
        return;
      }

      const coachesData = await getCoaches();

      const coachEncontrado = coachesData.find(
        (coach) => String(coach.coachId) === String(cliente.coachId)
      );

      if (coachEncontrado) {
        setCoachNombre(coachEncontrado.fullName);
      } else {
        setCoachNombre("No disponible");
      }
    } catch (error) {
      console.error("Error al cargar el coach:", error);
      setCoachNombre("No disponible");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function guardarCambios(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!clienteId) {
      setErrorMessage("No se encontró el ID del cliente.");
      return;
    }

    if (!puedeModificar) {
      setErrorMessage("No tiene permisos para modificar este perfil.");
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim()) {
      setErrorMessage("El nombre y el correo son obligatorios.");
      return;
    }

    try {
      const clienteActualizado = {
        ...cliente,
        fullName: formData.fullName,
        email: formData.email,
        goal: formData.goal,
        coachId: esAdmin
          ? Number(formData.coachId)
          : cliente.coachId,
      };

      await updateClient(clienteId, clienteActualizado);

      setCliente(clienteActualizado);
      localStorage.setItem("cliente", JSON.stringify(clienteActualizado));

      if (localStorage.getItem("usuario")) {
        const usuarioActualizado = {
          ...usuarioInicial,
          ...clienteActualizado,
          role: usuarioInicial.role || usuarioInicial.rol || rolUsuario,
        };

        localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
      }

      setSuccessMessage("Perfil actualizado correctamente.");
      setEditando(false);
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      setErrorMessage(error.message || "Error al actualizar el perfil.");
    }
  }

  async function eliminarPerfil() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!clienteId) {
      setErrorMessage("No se encontró el ID del cliente.");
      return;
    }

    if (!puedeModificar) {
      setErrorMessage("No tiene permisos para eliminar este perfil.");
      return;
    }

    const confirmar = window.confirm(
      "¿Está seguro de que desea eliminar este perfil?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await deleteClient(clienteId);

      localStorage.removeItem("cliente");
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Error al eliminar perfil:", error);
      setErrorMessage(error.message || "Error al eliminar el perfil.");
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("cliente");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    navigate("/login");
  }

  if (!clienteId) {
    return (
      <section className="perfil-page">
        <h2>Perfil del cliente</h2>

        <div className="perfil-card">
          <p>No hay un cliente cargado en sesión.</p>

          <button className="perfil-btn" onClick={() => navigate("/login")}>
            Ir al login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="perfil-page">
      <h2>Perfil del cliente</h2>

      <p className="perfil-subtitulo">
        Información personal y datos asociados al cliente.
      </p>

      <div className="perfil-card">
        <div className="perfil-avatar">
          {cliente.fullName?.charAt(0) ||
            cliente.nombre?.charAt(0) ||
            "C"}
        </div>

        <h3>{cliente.fullName || cliente.nombre || "Cliente"}</h3>

        {errorMessage && <div className="alert error">{errorMessage}</div>}
        {successMessage && <div className="alert success">{successMessage}</div>}

        {!editando ? (
          <>
            <div className="perfil-info">
              <p>
                <strong>Nombre:</strong>{" "}
                {cliente.fullName || cliente.nombre || "No disponible"}
              </p>

              <p>
                <strong>Correo:</strong>{" "}
                {cliente.email || cliente.correo || "No disponible"}
              </p>

              <p>
                <strong>Objetivo:</strong>{" "}
                {cliente.goal || cliente.objetivo || "No disponible"}
              </p>

              <p>
                <strong>ID del cliente:</strong>{" "}
                {cliente.clientId || cliente.id || "No disponible"}
              </p>

              <p>
                <strong>Nombre del entrenador:</strong>{" "}
                {coachNombre}
              </p>
            </div>

            <div className="perfil-acciones">
              {puedeModificar && (
                <>
                  <button
                    className="perfil-btn"
                    onClick={() => setEditando(true)}
                  >
                    Editar perfil
                  </button>

                  <button
                    className="perfil-btn-eliminar"
                    onClick={eliminarPerfil}
                  >
                    Eliminar perfil
                  </button>
                </>
              )}

              <button className="perfil-btn-secundario" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </>
        ) : (
          <form className="perfil-form" onSubmit={guardarCambios}>
            <label>
              Nombre
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Correo
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
              ID del entrenador
              <input
                type="number"
                name="coachId"
                value={formData.coachId}
                onChange={handleChange}
                disabled={!esAdmin}
              />
            </label>

            {!esAdmin && (
              <p className="perfil-nota">
                Solo el administrador puede cambiar el entrenador asignado.
              </p>
            )}

            <div className="perfil-acciones">
              <button type="submit" className="perfil-btn">
                Guardar cambios
              </button>

              <button
                type="button"
                className="perfil-btn-secundario"
                onClick={() => setEditando(false)}
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