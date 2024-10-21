import React from "react";

const StoreCard = ({ stores }) => {  
  return (
    stores &&
    stores.map((store) => {
      return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg ">
          <div className="px-6 py-4">
            {/* Store Name */}
            <div className="font-bold text-xl mb-2">{store.name}</div>

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
              <strong>Service Radius:</strong> {store.radius} km
            </p>
          </div>

          {/* Footer with actions */}
          <div className="px-6 pt-4 pb-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              View Details
            </button>
            <button className="bg-green-500 text-white px-4 py-2 ml-2 rounded shadow hover:bg-green-600">
              Contact Store
            </button>
          </div>
        </div>
      );
    })
  );
};

export default StoreCard;
