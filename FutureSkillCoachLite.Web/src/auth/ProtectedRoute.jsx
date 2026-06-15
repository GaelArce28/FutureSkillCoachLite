import { Navigate } from "react-router-dom";
import { getCurrentRole, hasRole } from "./session";

function ProtectedRoute({ children, allowedRoles }) {
  const role = getCurrentRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(role, allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;