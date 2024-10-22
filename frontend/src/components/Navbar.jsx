import Profile from "./Profile";
import { useAuthContext } from "../context/authContext";
import ThemeChanger from './ThemeChanger';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  const navbarMenu = {
    ROLES_USER: [{ name: "Create Store", link: "/create" }],
    ROLES_ADMIN: [
      { name: "Create Store", link: "/create" },
      { name: "Your Store", link: "/userStore" }
    ],
  };

  // Function to get the appropriate menu based on roles
  const getMenu = () => {
    if (user.roles.includes("ROLES_ADMIN")) {
      return navbarMenu["ROLES_ADMIN"];
    } else if (user.roles.includes("ROLES_USER")) {
      return navbarMenu["ROLES_USER"];
    }
    return [];
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
          getMenu().map((menuItem) => (
            <a key={menuItem.name} href={menuItem.link} className="btn btn-ghost">
              {menuItem.name}
            </a>
          ))}
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
