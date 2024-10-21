import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/authContext";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const { login, user: loggedInUser } = useAuthContext();
  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.userName, user.password);
      console.log(currentUser);
      if (currentUser.status === 200) {
        login(currentUser.data);
        Swal.fire({
          icon: "success",
          title: "User Login",
          text: "login successfully",
          timer: 1500,
        });
        setUser({
          userName: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "User Registration",
        text: error.message,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl mt-[-50px]">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User name</span>
            </label>
            <input
              type="text"
              placeholder="Enter user name"
              className="input input-bordered"
              name="userName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mt-/">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <a class="link link-primary" href="/register">
            Don't have any user
          </a>
          <div className="form-control mt-4">
            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
