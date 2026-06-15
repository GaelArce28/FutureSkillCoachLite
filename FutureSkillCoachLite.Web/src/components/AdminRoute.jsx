import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return <Navigate to="/login" replace />;
  }

  const usuario = JSON.parse(usuarioGuardado);

  if (usuario.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;