import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Icon } from "leaflet";
import marker from "../assets/location.png"


const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    lat: "",
    lng: "",
  });
  const markerIcon = new Icon({
    iconUrl: marker,
    iconSize: [35, 45], // size of the icon
  });
  const [location, setLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation(e.latlng); // Set the location when the map is clicked
      },
    });
    return location === null ? null : <Marker icon={markerIcon}  position={location}></Marker>;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleConfirmLocation = () => {
    if (location) {
      // Update user state with the selected location
      setUser({ ...user, lat: location.lat, lng: location.lng });
      setShowMap(false); // Close the map
    } else {
      alert("Please select you location ");
    }
  };

  const handleSubmit = async () => {
    try {
      const register = await AuthService.register(
        user.userName,
        user.email,
        user.password,
        user.lat,
        user.lng
      );
      if (register.status === 200) {
        Swal.fire({
          icon: "success",
          title: "User Registration",
          text: register.data.message,
          timer: 1500,
        });
        setUser({ userName: "", email: "", password: "", lat: "", lng: "" });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "User Registration",
        text: error.response ? error.response.data.message : "Unknown error",
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-row w-96 max-w-6xl bg-base-100 shadow-xl rounded mb-6">
        {/* Form section */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Enter your username"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>

          {/* Button for choosing location */}
          <div className="form-control mt-6">
            <button
              className="btn btn-info w-full"
              onClick={() => setShowMap(true)}
            >
              Choose Location
            </button>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary w-full " onClick={handleSubmit}>Register</button>
          </div>
        </div>
      </div>

      {/* Popup for the map */}
      {showMap && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-3/4 lg:w-1/2">
            <h3 className="text-lg font-bold mb-4">Choose your location</h3>
            <MapContainer
              center={[13.838510043535697, 100.02535680572677]}
              zoom={13}
              className="h-64 w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
            <div className="mt-4 flex justify-between">
              <button
                className="btn btn-info"
                onClick={handleConfirmLocation} // Confirm location and close the map
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowMap(false)} // Just close the map
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
