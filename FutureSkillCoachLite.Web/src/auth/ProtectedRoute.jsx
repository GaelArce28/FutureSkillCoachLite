import { Navigate } from "react-router-dom";
import { getCurrentRole } from "./session";

function ProtectedRoute({ children, allowedRoles }) {
  const role = getCurrentRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = role.toLowerCase();

  const hasAccess = allowedRoles.some(
    (allowedRole) => allowedRole.toLowerCase() === normalizedRole
  );

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;