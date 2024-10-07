import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  Circle,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CirclelToll from "./CirclelToll";

function App() {
  const center = [13.838510043535697, 100.02535680572677];
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({
    lat: null,
    lng: null,
  });
  const [selectedStore, setSelectedStore] = useState(null);
  const [message, setMessage] = useState("");
  const [circleVisible, setCircleVisible] = useState(false);
  const apiURL = import.meta.env.VITE_BASE_API;

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        setMessage("Unable to retrieve your location.");
      }
    );
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setMessage(""); // Clear message on store selection
  };

  const handleCheckZone = () => {
    if (!selectedStore || myLocation.lat === null || myLocation.lng === null) {
      setMessage("Please select a store and ensure your location is set.");
      return;
    }
    const { lat: storeLat, lng: storeLng, radius } = selectedStore; // Assuming radius is in meters
    const distance = getDistance(
      { lat: myLocation.lat, lng: myLocation.lng },
      { lat: storeLat, lng: storeLng }
    );

    if (distance <= radius) {
      setMessage("You are within the store's delivery radius!");
    } else {
      setMessage("You are outside the store's delivery radius.");
    }
    setCircleVisible(true); // Show circle for feedback
  };

  const getDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000; // Radius of the Earth in meters
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.lat)) *
        Math.cos(toRad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const LocationMap = () => {
    useMapEvent({
      click(e) {
        const { lat, lng } = e.latlng;
        setMyLocation({ lat, lng });
      },
    });
    return myLocation.lat && myLocation.lng ? (
      <Marker position={[myLocation.lat, myLocation.lng]}>
        <Popup>My current location</Popup>
      </Marker>
    ) : null;
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(apiURL + "/api/stores");
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.log(error);
        setMessage("Failed to load stores.");
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-center text-3xl font-bold mb-3">
        Store Delivery Zone Checker
      </h1>
      <div className="flex justify-center items-center mx-auto mb-3 space-x-2">
        <button onClick={handleGetLocation} className="btn btn-ghost">
          Get location
        </button>
        <button onClick={handleCheckZone} className="btn btn-outline">
          Check zone
        </button>
      </div>
      {message && <p className="text-center text-red-500">{message}</p>}
      <div className="flex justify-center items-center mx-auto">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "85vh", width: "90vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMap />
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.lat, store.lng]}
              eventHandlers={{
                click: () => {
                  handleStoreClick(store);
                },
              }}
            >
              <Popup>
                <b>{store.name}</b>
                <p>{store.address}</p>
                <p>{store.id}</p>
              </Popup>
            </Marker>
          ))}
          {circleVisible && selectedStore && (
            <Circle
              center={[selectedStore.lat, selectedStore.lng]}
              radius={selectedStore.radius}
              pathOptions={{
                color: "blue",
                fillColor: "#0a6cff",
                fillOpacity: 0.5,
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
