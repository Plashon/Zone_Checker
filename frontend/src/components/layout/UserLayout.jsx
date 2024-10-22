import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const UserLayout = () => {
  return (
    <div>
       <Navbar />
      <div className=" h-auto mt-20 mb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
