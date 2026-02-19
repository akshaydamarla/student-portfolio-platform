import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function RoleProtectedRoute({ children, allowedRole }) {
  const { token, role } = useAuth();

  // Fallback to localStorage in case context is not yet initialized
  let currentToken = token || localStorage.getItem("token");
  let currentRole = role;

  if (!currentRole && currentToken) {
    try {
      const decoded = jwtDecode(currentToken);
      currentRole = decoded.role;
    } catch (error) {
      return <Navigate to="/" />;
    }
  }

  if (!currentToken) {
    return <Navigate to="/" />;
  }

  if (currentRole !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;