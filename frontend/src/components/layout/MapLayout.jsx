import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MapLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="h-auto mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default MapLayout;