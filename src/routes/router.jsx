import MainLayout from "@/layout/MainLayout";
import Error from "@/pages/Error/Error";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import RoutesByRole from "./RoutesByRole";
import { Dashboard } from "@/layout/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard/*",
    errorElement: <Error />,
    element: <Dashboard />,
    children: [
      {
        path: "*",
        element: <RoutesByRole />,
      },
    ],
  },
]);

export default router;
