import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const UserLayout = () => {
  return (
    <div>
       <Navbar />
      <div className=" h-auto mb-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
