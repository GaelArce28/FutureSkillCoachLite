import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        Gimnasio <span>El Dorado</span>
      </h1>

      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/login">Login</Link>
        <Link to="/citas">Citas</Link>
      </nav>
    </header>
  );
}

export default Header;