import { createContext, useContext, useEffect, useState } from "react";
import StoreService from "../services/store.service";
import Swal from "sweetalert2";
import { useAuthContext } from "./authContext";
export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
  const {login} = useAuthContext()
  const [stores, setStores] = useState([]);
  const [filterStore, setFilterStore] = useState([]);

  //show store
  const getStoreById = async (id) => {
    try {
      const response = await StoreService.getByStoreId(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error getting store by ID:", error);
    }
  };

  const getStore = async () => {
    try {
      const response = await StoreService.getAllStore();
      if (response.status === 200) {
        setStores(response.data);
        setFilterStore(response.data);
      }
    } catch (error) {
      console.error("Error getting Store : ", error);
    }
  };
  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    setFilterStore(stores);
  }, [stores]);

  //create new store
  const createStore = async (newStore) => {
    try {
      const response = await StoreService.createStore(newStore);
      if (response.status === 200) {
        setStores((prev) => [...prev, response.data]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create new store",
          text: "Store created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error creating store :", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create the new store.",
      });
    }
  };

  //update store data
  const updateStore = async (id, updateStore) => {
    try {
      const response = await StoreService.updateStoreById(id, updateStore);
      if (response.status === 200) {
        setStores((prev) =>
          prev.map((store) => (store.id === id ? updateStore : store))
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Store Updated",
          text: "Store updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        getStore();
      }
    } catch (error) {
      console.error("Error updating store :", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the store.",
      });
    }
  };

  //delete store
  const deleteStore = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D91656",
      cancelButtonColor: "#B7B7B7",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, I misdial",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await StoreService.deleteStoreById(id); // Assuming you have a service to handle API call
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "The store has been deleted.",
              icon: "success",
              confirmButtonColor: "#D91656",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the store.",
          });
          console.error("Error deleting store:", error);
        }
      }
    });
  };

  return (
    <StoreContext.Provider
      value={{
        stores,
        filterStore,
        setFilterStore,
        getStore,
        getStoreById,
        createStore,
        updateStore,
        deleteStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
