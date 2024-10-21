import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const IsUser = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.roles.includes("ROLES_ADMIN")) {
    return children;
  }
  return <Navigate to="/store" />;
};

export default AdminOnly;