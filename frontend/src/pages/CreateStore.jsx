import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const CreateStore = () => {
  const navigate = useNavigate();
  const { createStore } = useStoreContext();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    radius: ''
  });
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null); // เก็บตำแหน่งชั่วคราว

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันส่งข้อมูลฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStore(formData);
    navigate("/store");
  };

  // คอมโพเนนต์สำหรับจับเหตุการณ์คลิกบนแผนที่
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation(e.latlng); // อัปเดตตำแหน่งชั่วคราวเมื่อคลิกที่แผนที่
      },
    });
    return location === null ? null : <Marker position={location}></Marker>;
  };

  // ฟังก์ชันยืนยันพิกัดจากแผนที่
  const handleConfirmLocation = () => {
    if (location) {
      // อัปเดตค่า lat และ lng ใน formData
      setFormData({ ...formData, lat: location.lat, lng: location.lng });
      setShowMap(false); // ปิดแผนที่หลังจากยืนยัน
    } else {
      alert("Please select a location");
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Create Store</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Store Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Radius (in meters)</span>
          </label>
          <input
            type="number"
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        {/* ปุ่มสำหรับแสดงแผนที่ */}
        <button
          type="button"
          className="btn btn-secondary w-full mt-2"
          onClick={() => setShowMap(true)}
        >
          Choose Location on Map
        </button>
        {/* ปุ่มสำหรับส่งฟอร์ม */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Create Store
        </button>
      </form>

      {/* Popup แผนที่ */}
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
              <LocationMarker /> {/* เรียก LocationMarker สำหรับคลิกเลือกพิกัด */}
            </MapContainer>
            <div className="mt-4 flex justify-between">
              <button
                className="btn btn-info"
                onClick={handleConfirmLocation} // ยืนยันพิกัดและปิดแผนที่
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowMap(false)} // ปิดแผนที่โดยไม่ยืนยัน
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

export default CreateStore;
