import AllDeliveryMens from "@/pages/Dashboard/Admin/AllDeliveryMens";
import AllParcels from "@/pages/Dashboard/Admin/AllParcels";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";
import AppStatistics from "@/pages/Dashboard/Admin/AppStatistics";
import MyDeliveryList from "@/pages/Dashboard/DeliveryMen/MyDeliveryList";
import MyReviews from "@/pages/Dashboard/DeliveryMen/MyReviews";
import BookAParcel from "@/pages/Dashboard/User/BookParcel";
import MyParcels from "@/pages/Dashboard/User/MyParcels";
import MyProfile from "@/pages/Dashboard/User/MyProfile";
import { useRoutes } from "react-router-dom";

const RoutesByRole = () => {
  const role = "user";

  const userRoutes = [
    {
      path: "",
      element: <MyProfile />,
    },
    {
      path: "book-parcel",
      element: <BookAParcel />,
    },
    {
      path: "my-parcels",
      element: <MyParcels />,
    },
  ];

  const deliveryMenRoutes = [
    {
      path: "",
      element: <MyDeliveryList />,
    },
    {
      path: "my-reviews",
      element: <MyReviews />,
    },
  ];

  const adminRoutes = [
    {
      path: "",
      element: <AppStatistics />,
    },
    {
      path: "users",
      element: <AllUsers />,
    },
    {
      path: "delivery-mens",
      element: <AllDeliveryMens />,
    },
    {
      path: "all-parcels",
      element: <AllParcels />,
    },
  ];

  const routes =
    role === "admin"
      ? adminRoutes
      : role === "delivery_men"
        ? deliveryMenRoutes
        : userRoutes;
  return useRoutes(routes);
};

export default RoutesByRole;
