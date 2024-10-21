import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;