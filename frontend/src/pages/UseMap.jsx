import { MapContainer, TileLayer, Circle } from "react-leaflet"; // Import Circle
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "leaflet";

const apiURL = import.meta.env.VITE_BASE_API;
import shopIcon from "../assets/shop.png";
import LocationMap from "../components/LocationMap";
import Store from "../components/Store";
import StoreService from "../services/store.service";

function UseMap() {
  const center = [13.838510043535697, 100.02535680572677];
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({
    lat: "",
    lng: "",
  });
  const [deliveryZones, setDeliveryZones] = useState([]); // To hold all delivery zones
  const [selectedStoreIds, setSelectedStoreIds] = useState([]); // Changed to an array

  // Calculate distance function remains unchanged
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;
    const delta_phi = ((lat1 - lat2) * Math.PI) / 180;
    const delta_lambda = ((lng1 - lng2) * Math.PI) / 180;
    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in meters
  };

  const handleLocationCheck = () => {
    if (myLocation.lat === "" || myLocation.lng === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select your location",
      });
      return;
    }
  
    // Reset delivery zones and selected store IDs
    setDeliveryZones([]);
    setSelectedStoreIds([]); // Reset selected store IDs
  
    // Prepare to collect store names
    const storeNames = [];
  
    // Check each store's delivery zone
    stores.forEach((store) => {
      const distance = calculateDistance(
        myLocation.lat,
        myLocation.lng,
        store.lat,
        store.lng
      );
  
      // Check if the user's location is within the store's delivery zone
      if (distance <= store.radius) {
        setDeliveryZones((prevZones) => [
          ...prevZones,
          { lat: store.lat, lng: store.lng, radius: store.radius },
        ]);
        setSelectedStoreIds((prevIds) => [...prevIds, store.id]); // Add store ID to the list
        storeNames.push(store.name); // Add the store name to the list
      }
    });
  
    if (storeNames.length > 0) {
      Swal.fire({
        icon: "success",
        title: "You can order from:",
        text: storeNames.join(", "), // Join store names into a string
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "No Delivery Zone",
        text: "Your location is not within any store's delivery zone.",
      });
    }
  };
  

  const handleStoreClick = (store) => {
    // Show only the selected store zone
    setDeliveryZones([{ lat: store.lat, lng: store.lng, radius: store.radius }]);
    setSelectedStoreIds([store.id]); // Set selected store to just the clicked one
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Geolocation is not supported by this browser.",
      });
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStore();
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
  }, []);

  const storeIcon = new Icon({
    iconUrl: shopIcon,
    iconSize: [38, 45],
  });

  const getStoreIcon = (storeId) => {
    return selectedStoreIds.includes(storeId)
      ? new Icon({ iconUrl: shopIcon, iconSize: [56, 65] }) // Bigger size for selected stores
      : storeIcon; // Regular size
  };

  return (
    <>
      <div className="p-3">
        <h1 className="text-center text-3xl font-bold mb-3">
          Store Delivery Zone Checker
        </h1>
        <div className="flex justify-center items-center mx-auto mb-3 space-x-2">
          <button onClick={handleGetLocation} className="btn btn-ghost">
            Get location
          </button>
          <button className="btn btn-outline" onClick={handleLocationCheck}>
            Check delivery zone
          </button>
        </div>
        <div className="flex justify-center items-center mx-auto">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "100%" }}
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
             <LocationMap
              setMyLocation={setMyLocation}
              myLocation={myLocation}
            />

            {/* Render all delivery zones for stores within the user's location */}
            {deliveryZones.map((zone, index) => (
              <Circle
                key={index}
                center={[zone.lat, zone.lng]}
                radius={zone.radius} // Use radius directly in meters
                color="hsl(300, 50%, 80%)"
                fillColor="hsl(300, 30%, 90%)"
                fillOpacity={0.3}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default UseMap;
