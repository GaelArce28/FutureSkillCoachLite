import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../auth/session";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const usuario = getCurrentUser();
  const role = usuario?.role || usuario?.rol || usuario?.userRole || null;

  const esCliente = role?.toLowerCase() === "client";
  const esCoach = role?.toLowerCase() === "coach";
  const esAdmin = role?.toLowerCase() === "admin";

  const cerrarMenu = () => {
    setMenuOpen(false);
  };

  const cerrarSesion = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link" onClick={cerrarMenu}>
        <h1 className="logo">
          FutureSkill <span>Coach Lite</span>
        </h1>
      </Link>

      <button
        className="menu-btn"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>

        {!usuario && (
          <>
            <Link to="/clientes" onClick={cerrarMenu}>
              Registrar
            </Link>

            <Link to="/entrenadores" onClick={cerrarMenu}>
              Entrenadores
            </Link>

            <Link to="/actividades" onClick={cerrarMenu}>
              Actividades
            </Link>

            <Link to="/informacion" onClick={cerrarMenu}>
              Información
            </Link>

            <Link to="/login" onClick={cerrarMenu}>
              Login
            </Link>
          </>
        )}

        {esCliente && (
          <>
            <Link to="/perfil" onClick={cerrarMenu}>
              Perfil
            </Link>

            <Link to="/citas" onClick={cerrarMenu}>
              Citas
            </Link>

            <Link to="/actividades" onClick={cerrarMenu}>
              Actividades
            </Link>

            <Link to="/informacion" onClick={cerrarMenu}>
              Información
            </Link>

            <Link to="/coach-dashboard" onClick={cerrarMenu}>
              Coaches
            </Link>

            <button type="button" className="nav-button" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        )}

        {esCoach && (
          <>
            <Link to="/mis-clientes" onClick={cerrarMenu}>
              Mis clientes
            </Link>

            <Link to="/citas" onClick={cerrarMenu}>
              Citas
            </Link>

            <Link to="/informacion" onClick={cerrarMenu}>
              Información
            </Link>

            <button type="button" className="nav-button" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        )}

        {esAdmin && (
          <>
            <Link to="/admin" onClick={cerrarMenu}>
              Admin
            </Link>

            <Link to="/perfil" onClick={cerrarMenu}>
              Perfil
            </Link>

            <button type="button" className="nav-button" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;