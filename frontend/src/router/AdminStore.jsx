import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

const AdminStore = ({ children }) => {
  const { user } = useAuthContext();
  const {stores} = useStoreContext
  if (user.id != stores.userId ) {
    return <Navigate to="/store" />;
  }
  return children;
};

export default AdminStore;