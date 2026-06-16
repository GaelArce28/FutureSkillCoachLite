import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../auth/session";

const enlacesPublicos = [
  { path: "/clientes", label: "Registrar" },
  { path: "/entrenadores", label: "Registrar coach" },
  { path: "/actividades", label: "Actividades" },
  { path: "/informacion", label: "Información" },
  { path: "/login", label: "Login" },
];

const enlacesPorRol = {
  client: [
    { path: "/perfil", label: "Perfil" },
    { path: "/citas", label: "Citas" },
    { path: "/actividades", label: "Actividades" },
    { path: "/informacion", label: "Información" },
    { path: "/coach-dashboard", label: "Coaches" },
  ],
  coach: [
    { path: "/mis-clientes", label: "Mis clientes" },
    { path: "/citas", label: "Citas" },
    { path: "/informacion", label: "Información" },
  ],
  admin: [
    { path: "/admin", label: "Admin" },
    
  ],
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Usuario guardado en sesión local.
  const usuario = getCurrentUser();

  // El backend puede guardar el rol con distintos nombres.
  const rolActual = obtenerRol(usuario);

  // Si no hay usuario, se muestra el menú público.
  // Si hay usuario, se muestra el menú correspondiente a su rol.
  const enlacesMenu = usuario ? enlacesPorRol[rolActual] || [] : enlacesPublicos;

  function obtenerRol(usuarioActual) {
    const rol =
      usuarioActual?.role ||
      usuarioActual?.rol ||
      usuarioActual?.userRole ||
      "";

    return rol.toLowerCase();
  }

  function cerrarMenu() {
    setMenuOpen(false);
  }

  function cambiarEstadoMenu() {
    setMenuOpen((menuAbierto) => !menuAbierto);
  }

  function cerrarSesion() {
    logout();
    cerrarMenu();
    navigate("/login");
  }

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
        onClick={cambiarEstadoMenu}
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
        aria-controls="menu-principal"
      >
        ☰
      </button>

      <nav
        id="menu-principal"
        className={`nav ${menuOpen ? "nav-open" : ""}`}
      >
        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>

        {enlacesMenu.map((enlace) => (
          <Link key={enlace.path} to={enlace.path} onClick={cerrarMenu}>
            {enlace.label}
          </Link>
        ))}

        {usuario && (
          <button type="button" className="nav-button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;