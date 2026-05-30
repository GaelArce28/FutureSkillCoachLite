import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import imagen1 from "./assets/1.jpeg";

import Header from './components/Header'
import Footer from './components/Footer'

import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Cursos from './pages/Cursos'
import Perfil from './pages/Perfil'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="main">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App