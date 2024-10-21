import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MapLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="h-px mb-48">
        <Outlet />
      </div>
      <div className="fixed z-50 bottom-0 right-0 left-0">
        <Footer />
      </div>
    </div>
  );
};

export default MapLayout;