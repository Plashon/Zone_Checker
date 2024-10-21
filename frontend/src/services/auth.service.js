import api from "./api";
const VITE_AUTH_API = import.meta.env.VITE_AUTH_API;

//view user by id
const getUserById = async (id) => {
  return await api.get(`${VITE_AUTH_API}/${id}`);
};
//register new user
const register = async (userName, email, password, lat, lng) => {
  return await api.post(VITE_AUTH_API + "/register", {
    userName,
    email,
    password,
    lat,
    lng,
  });
};

//login
const login = async (userName, password) => {
  const response = await api.post(VITE_AUTH_API + "/login", {
    userName,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken)
    );
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
};

//logout
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

const AuthService = {
  getUserById,
  register,
  login,
  logout,
};
export default AuthService;
