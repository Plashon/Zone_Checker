import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import router from "./router/router.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <RouterProvider router={router} />{" "}
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>
);
