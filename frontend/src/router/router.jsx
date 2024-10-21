import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const DefaultLayout = lazy(() => import("../components/layout/DefaultLayout"));
const UserLayout = lazy(() => import("../components/layout/UserLayout"));
const MapLayout = lazy(() => import("../components/layout/MapLayout"));
const Home = lazy(() => import("../pages/Home"));
const UseMap = lazy(() => import("../pages/UseMap"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const StorePage = lazy(() => import("../pages/StorePage"));
const CreateStore = lazy(() => import("../pages/CreateStore"));
const UpdateStore = lazy(() => import("../pages/UpdateStore"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AdminOnly = lazy(() => import("./AdminOnly"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "aboutus", element: <AboutUs /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <MapLayout />,
    children: [
      {
        path: "store",
        element: <StorePage />,
      },
      {
        path: "create",
        element: <CreateStore />,
      },
      {
        path: "update/:id",
        element: (
          <AdminOnly>
            <UpdateStore />
          </AdminOnly>
        ),
      },
      {
        path:"testmap",
        element:<UseMap/>
      }
    ],
  },
]);
export default router;
