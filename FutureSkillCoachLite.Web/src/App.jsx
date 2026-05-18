import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import "./styles/main.css";

function Home() {
  return (
    <main className="page-container">
      <h1>FutureSkillCoachLite</h1>
      <p>Sistema de gestión para coaches, clientes y citas de coaching.</p>

      <section className="home-card">
        <h2>Bienvenido</h2>
        
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <Link to="/" className="logo">
          FutureSkillCoachLite
        </Link>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/clients">Clientes</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;