import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import imagen1 from "./assets/1.jpeg";
import actividad from "./assets/actividad.jpeg";

import Header from './components/Header'
import Footer from './components/Footer'

import Citas from './pages/Citas'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Actividades from './pages/Actividades'
import Perfil from './pages/Perfil'
import Informacion from "./pages/Informacion";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="main">
          <Routes>
            <Route path="/citas" element={<Citas />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<Login />} />
             <Route path="/" element={<Inicio />} />
            <Route path="/informacion" element={<Informacion />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App