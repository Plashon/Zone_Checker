import React, { useState, useTransition } from "react";
import { useStoreContext } from "./../context/StoreContext";
import { useAuthContext } from "./../context/authContext"; // Assuming you have this context
import { useNavigate } from "react-router-dom";
const StoreCard = () => {
  const { stores, deleteStore } = useStoreContext();
  const { user } = useAuthContext(); // Get current logged-in user
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

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
    })
  };

  return (
    stores &&
    stores.map((store) => {
      const isOwner = store.userId === user.id; // Check if current user owns the store

      return (
        <div
          key={store.id}
          className="max-w-sm rounded overflow-hidden shadow-lg bg-sky-300 mb-4"
        >
          <div className="px-6 py-4">
            {/* Store Name */}
            <div className="text-gray-700 font-bold text-xl mb-2">
              <strong>{store.name}</strong>
            </div>

            {/* Store Address */}
            <p className="text-gray-700 text-base">
              <strong>Address:</strong> {store.address}
            </p>

            {/* Store Geolocation */}
            <p className="text-gray-700 text-base mt-2">
              <strong>Store's Coordinates:</strong> {store.lat}, {store.lng}
            </p>

            {/* Service Radius */}
            <p className="text-gray-700 text-base mt-2">
              <strong>Service Radius:</strong> {store.radius} Mater
            </p>
          </div>

          {/* Footer with actions */}
          <div className="px-6 pt-4 pb-2">
            {/* Show Contact Store and Delete Store buttons only if the user owns the store */}
            {isOwner && (
              <>
                <button
                  onClick={() => handleUpdate(store.id)} // Call handleUpdate on button click
                  className="bg-blue-700 text-white px-4 py-2 ml-2 rounded shadow hover:bg-green-600"
                >
                  Adjust Store
                </button>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2 rounded shadow hover:bg-orange-500"
                >
                  Delete Store
                </button>
              </>
            )}
          </div>
        </div>
      );
    })
  );
};

export default StoreCard;
