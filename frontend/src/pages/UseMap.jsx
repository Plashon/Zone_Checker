import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "leaflet";

const apiURL = import.meta.env.VITE_BASE_API;
import shopIcon from "../assets/shop.png";
import LocationMap from "../components/LocationMap";
import Store from "../components/Store";
import StoreCard from '../components/StoreCard'
import { useAuthContext } from "../context/authContext";

function UseMap() {
  const center = [13.838510043535697, 100.02535680572677];
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({
    lat: "",
    lng: "",
  });
  const [deliveryZone, setDeliveryZone] = useState({
    lat: "",
    lng: "",
    radius: 0,
  });
  const [selectedStoreId, setSelectedStoreId] = useState();

  //calculateDistance betoween 2 points using math
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; //eath radius in meters
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
    return R * c; // distancein meters
  };

  const handleLocationCheck = () => {
    if (myLocation.lat === "" || myLocation.lng === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select you location",
      });
      return;
    }
    if (deliveryZone.lat === "" || deliveryZone.lng === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select store ",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      deliveryZone.lat,
      deliveryZone.lng
    );
    if (distance <= deliveryZone.radius) {
      Swal.fire({
        icon: "success",
        title: "ohh",
        text: "you are within a delivery zone ",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you are without a delivery zone ",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const handleStoreClick = (store) => {
    setDeliveryZone({ lat: store.lat, lng: store.lng, radius: store.radius });
    setSelectedStoreId(store.id);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
      );
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
        const response = await axios.get(apiURL + "/api/jsonstores");
        console.log(response.data);
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
    return storeId === selectedStoreId
      ? new Icon({ iconUrl: shopIcon, iconSize: [56, 65] }) // Bigger size
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
          <StoreCard stores={stores}/>
        </div>
        <div className="flex justify-center items-center mx-auto">
        
          {" "}
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
            {/* Use Location here */}
            <LocationMap
              setMyLocation={setMyLocation}
              myLocation={myLocation}
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default UseMap;
