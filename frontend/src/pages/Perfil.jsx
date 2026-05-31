import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clienteGuardado = localStorage.getItem("cliente");
    const token = localStorage.getItem("token");

    if (!clienteGuardado || !token) {
      navigate("/login");
      return;
    }

    setCliente(JSON.parse(clienteGuardado));
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cliente");
    navigate("/login");
  };

  if (!cliente) {
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
          <span>{cliente.nombre?.charAt(0).toUpperCase()}</span>
        </div>

        <h2>Perfil del cliente</h2>

        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong> {cliente.nombre}
          </p>

          <p>
            <strong>Usuario:</strong> {cliente.usuario}
          </p>

          <p>
            <strong>Correo:</strong> {cliente.correo}
          </p>

          <p>
            <strong>Teléfono:</strong> {cliente.telefono}
          </p>

          <p>
            <strong>Membresía:</strong> {cliente.membresia}
          </p>

          <p>
            <strong>Fecha de registro:</strong> {cliente.fechaRegistro}
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