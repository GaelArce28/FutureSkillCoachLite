import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../auth/session";

function Perfil() {
  const navigate = useNavigate();
  const usuario = getCurrentUser();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  if (!usuario) {
    return (
      <section className="perfil">
        <h2>Cargando perfil...</h2>
      </section>
    );
  }

  return (
    <section className="perfil">
      <div className="perfil-card">
        <div className="perfil-avatar">
          <span>{usuario.fullName?.charAt(0).toUpperCase()}</span>
        </div>

        <h2>Perfil del cliente</h2>

        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong> {usuario.fullName}
          </p>

          <p>
            <strong>Correo:</strong> {usuario.email}
          </p>

          <p>
            <strong>Rol:</strong> {usuario.role}
          </p>

          <p>
            <strong>ID Cliente:</strong> {usuario.clientId || usuario.id}
          </p>

          <p>
            <strong>ID Coach asignado:</strong> {usuario.coachId}
          </p>
        </div>

        <button className="btn-cerrar" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}

export default Perfil;