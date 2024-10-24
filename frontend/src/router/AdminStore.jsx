import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

const AdminStore = ({ children }) => {
  const { user } = useAuthContext();
  const { stores } = useStoreContext();

  // Assuming that `stores` is an array of store objects and you want to find a store that belongs to the user
  const userStore = stores.find(store => store.userId === user.id);

  if (!userStore) {
    return <Navigate to="/store" />;
  }
  
  return children;
};

export default AdminStore;
