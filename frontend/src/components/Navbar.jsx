import Profile from "./Profile";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../context/authContext";
import ThemeChanger from './ThemeChanger';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  const navbarMenu = {
    ROLES_USER: [{ name: "Create Store", link: "/create" }],
    ROLES_ADMIN: [{ name: "Create Store", link: "/create" },{name:"Update Store", link : "/update"}],
  };
  return (
    <div className="navbar bg-base-100 shadow-lg top-0 w-full fixed z-50">
      <div className="navbar-start">
        <a href="/store" className="btn btn-ghost text-xl font-semibold">
          <span className="text-blue-800 font-semibold">SE</span>Store
        </a>
      </div>
      <div className="navbar-end gap-2">
      {user &&
          navbarMenu[user.roles[0]].map((menuItem) => (
            <a href={menuItem.link} className="btn btn-ghost">
              {menuItem.name}
            </a>
          ))}
        <SearchBar />
        {user ? (
          <Profile user={user} logout={logout} />
        ) : (
          <div className="space-x-2">
            <a href="/login" className="btn btn-outline text-white bg-blue-500">
              Login
            </a>
          </div>
        )}
        <ThemeChanger />
      </div>
    </div>
  );
};

export default Navbar;