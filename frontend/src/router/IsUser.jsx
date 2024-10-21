import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const IsUser = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "You are not login",
      text: "please login for view store",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to="/login" />;
  }
  if (user){
    return children;
  }
  return <Navigate to="/store" />;
};

export default IsUser;