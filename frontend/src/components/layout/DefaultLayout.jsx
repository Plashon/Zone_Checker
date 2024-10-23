import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
     <Footer/>
      
    </div>
  );
};

export default DefaultLayout;