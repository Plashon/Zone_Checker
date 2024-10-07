import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import homeIcon from "../assets/home.png";
const LocationMap = ({ setMyLocation, myLocation }) => {
  useMapEvent({
    click(e) {
      const { lat, lng } = e.latlng;
      setMyLocation({ lat, lng });
    },
  });
  const housingIcon = new Icon({
    iconUrl: homeIcon,
    iconSize: [35, 45], // size of the icon
  });

  return (
    <Marker icon={housingIcon} position={[myLocation.lat, myLocation.lng]}>
      <Popup>My current location</Popup>
    </Marker>
  );
};

export default LocationMap;
