import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import StoreCard from "../components/StoreCard";
import shopIcon from "../assets/shop.png";
import Store from "../components/Store";

import StoreService from "../services/store.service";

const StorePage = () => {
  const center = [13.838510043535697, 100.02535680572677]; // ตำแหน่งกลางของแผนที่
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState();
  const { id } = useParams();
    


  const storeIcon = new Icon({
    iconUrl: shopIcon,
    iconSize: [38, 45],
  });
  const getStoreIcon = (storeId) => {
    return storeId === selectedStoreId
      ? new Icon({ iconUrl: shopIcon, iconSize: [56, 65] }) // Bigger size
      : storeIcon; // Regular size
  };
  const handleStoreClick = (store) => {
    setSelectedStoreId(store.id);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* StoreCard ด้านซ้าย */}
      <div className="w-1/3 p-4 overflow-y-auto relative z-auto ml-12">
        <h1 className="text-xl font-bold mb-4">Store List</h1>
        <StoreCard stores={stores} />
      </div>

      {/* แผนที่ด้านขวา */}
      <div className="w-2/3 flex justify-center items-center">
        <MapContainer
          className=" sticky"
          center={center}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "100vh", width: "100%" }} // ใช้ความสูง 50vh
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Store
            stores={stores}
            handleStoreClick={handleStoreClick}
            getStoreIcon={getStoreIcon}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default StorePage;
