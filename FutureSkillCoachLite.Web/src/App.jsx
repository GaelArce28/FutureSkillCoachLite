import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Actividades from "./pages/Actividades";
import Perfil from "./pages/Perfil";
import Informacion from "./pages/Informacion";
import Citas from "./pages/Citas";
import ClientsPage from "./pages/ClientsPage";
import Entrenadores from "./pages/Entrenadores";
import CoachClientsPage from "./pages/CoachClientsPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/AdminRoute";
import CoachDashboard from "./pages/CoachDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="main">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/entrenadores" element={<Entrenadores />} />

            <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminPage />
    </AdminRoute>
  }
/>

            <Route
              path="/perfil"
              element={
                <ProtectedRoute allowedRoles={["Client"]}>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            

            <Route
              path="/citas"
              element={
                <ProtectedRoute allowedRoles={["Client", "Coach"]}>
                  <Citas />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mis-clientes"
              element={
                <ProtectedRoute allowedRoles={["Coach"]}>
                  <CoachClientsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Client"]}>
                  <CoachDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;