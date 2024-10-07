import { Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Store = ({ stores, handleStoreClick, getStoreIcon }) => {
  return (
    stores &&
    stores.map((store) => {
      return (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={getStoreIcon(store.id)}
          eventHandlers={{ click: () => handleStoreClick(store) }}
        >
          <Popup>
            <b>{store.name}</b>
            <p>{store.address}</p>
            <p>{store.id}</p>
          </Popup>
        </Marker>
      );
    })
  );
};
export default Store;
