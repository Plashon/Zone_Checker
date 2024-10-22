import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const User = ({ children }) => {
  const { user } = useAuthContext();
  if (user) {
    return <Navigate to="/store" />;
  }
  return children;
};

export default User;