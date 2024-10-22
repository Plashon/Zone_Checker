import React, { useEffect, useState,useTransition } from "react";
import { useAuthContext } from "./../context/authContext"; // Assuming this context provides user info
import StoreService from "../services/store.service";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "./../context/StoreContext";

const UserStore = () => {
  const { user } = useAuthContext();
  const { deleteStore } = useStoreContext();
  const [stores, setStores] = useState([]);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await deleteStore(id);
      if (response.status === 200) {
        window.location.reload(); // Refresh the page after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    startTransition(() => {
      navigate(`/update/${id}`);
    });
  };
  useEffect(() => {
    const fetchUserStores = async () => {
      try {
        const response = await StoreService.getStoreByUserId(user.id); // Fetch stores by user ID
        if (response.status === 200) {
          setStores(response.data); // Set stores state
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchUserStores();
  }, [user.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Your Stores</h1>
      {stores.length === 0 ? (
        <h1 className="text-2xl font-bold text-center">
        YOU DON'T HAVE ANY STORE
      </h1>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Store Name</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Latitude</th>
              <th className="border border-gray-300 px-4 py-2">Longitude</th>
              <th className="border border-gray-300 px-4 py-2">
                Service Radius (m)
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>{" "}
              {/* New Actions Column */}
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {store.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {store.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {store.lat}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {store.lng}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {store.radius} m
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn bg-blue-700 hover:bg-green-600 mr-2 mt-2"
                    onClick={() => handleUpdate(store.id)} // Add your edit function
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-red-500 hover:bg-orange-500"
                    onClick={() => handleDelete(store.id)} // Add your delete function
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserStore;
