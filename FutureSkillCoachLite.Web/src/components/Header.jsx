import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => {
    setMenuOpen(false);
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
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>Inicio</Link>
        <Link to="/clientes" onClick={cerrarMenu}>Clientes</Link>
        <Link to="/citas" onClick={cerrarMenu}>Citas</Link>
        <Link to="/actividades" onClick={cerrarMenu}>Actividades</Link>
        <Link to="/informacion" onClick={cerrarMenu}>Información</Link>
        <Link to="/entrenadores" onClick={cerrarMenu}>Entrenadores</Link>
        <Link to="/perfil" onClick={cerrarMenu}>Perfil</Link>
        <Link to="/login" onClick={cerrarMenu}>Login</Link>
      </nav>
    </header>
  );
}

export default Header;