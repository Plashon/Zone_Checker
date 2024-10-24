import React, { useEffect, useState,useTransition } from "react";
import { useParams } from "react-router-dom"; // To get the store ID from the URL
import StoreService from "../services/store.service"; // Import your StoreService
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateStore = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const { id } = useParams(); // Get store id from URL params
  const [storeData, setStoreData] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
    radius: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the store data when the component mounts
    const fetchStoreData = async () => {
      try {
        const response = await StoreService.getByStoreId(id);
        setStoreData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching store data:", error);
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [id]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const response = await StoreService.updateStoreById(id, storeData);
  if (response.status === 200) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Store Updated",
      text: "Store updated successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
} catch (error) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Failed to update the store.",
  });
  console.error("Error updating store:", error);
}

    startTransition(() => {
      navigate("/store");
      })
  };
 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-3xl font-bold mb-6 text-center">
          Loading store data...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Store</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-base-100 shadow-md rounded-lg p-6"
      >
        {/* Store Name */}
        <div className="mb-4">
          <label htmlFor="name" className="label">
            <span className="label-text">Store Name:</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={storeData.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Store Address */}
        <div className="mb-4">
          <label htmlFor="address" className="label">
            <span className="label-text">Address:</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={storeData.address}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Store Latitude */}
        <div className="mb-4">
          <label htmlFor="lat" className="label">
            <span className="label-text">Latitude:</span>
          </label>
          <input
            type="text"
            id="lat"
            name="lat"
            value={storeData.lat}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Store Longitude */}
        <div className="mb-4">
          <label htmlFor="lng" className="label">
            <span className="label-text">Longitude:</span>
          </label>
          <input
            type="text"
            id="lng"
            name="lng"
            value={storeData.lng}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Service Radius */}
        <div className="mb-4">
          <label htmlFor="radius" className="label">
            <span className="label-text">Service Radius (km):</span>
          </label>
          <input
            type="number"
            id="radius"
            min={1}
            name="radius"
            value={storeData.radius}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Store
        </button>
      </form>
    </div>
  );
};

export default UpdateStore;
