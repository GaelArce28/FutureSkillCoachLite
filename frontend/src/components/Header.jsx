import { Link } from 'react-router'

function Header() {
  return (
    <header className="header">
      <h1>Gimnacio El Dorado</h1>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}

export default Header