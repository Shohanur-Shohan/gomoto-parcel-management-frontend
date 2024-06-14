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
import PrivateRoute from "./PrivateRoute";
import useUserType from "@/hooks/useUserType";
import Loader from "@/components/Loader";
import UpdateBookedParcel from "@/pages/Dashboard/User/UpdateBookedParcel";

const RoutesByRole = () => {
  const [userType, isLoading] = useUserType();

  if (isLoading) {
    return <Loader />;
  }

  const user_type = userType || {};
  const role = user_type?.user_type; //user or delivery_men or admin
  // console.log(role);

  const userRoutes = [
    {
      path: "my-profile",
      element: (
        <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      ),
    },
    {
      path: "book-parcel",

      element: (
        <PrivateRoute>
          <BookAParcel />
        </PrivateRoute>
      ),
    },
    {
      path: "my-parcels",
      element: (
        <PrivateRoute>
          <MyParcels />
        </PrivateRoute>
      ),
    },
    {
      path: "update-booked-parcel/*",
      element: (
        <PrivateRoute>
          <UpdateBookedParcel />
        </PrivateRoute>
      ),
    },
  ];

  const deliveryMenRoutes = [
    {
      path: "delivery-list",
      element: (
        <PrivateRoute>
          <MyDeliveryList />
        </PrivateRoute>
      ),
    },
    {
      path: "my-reviews",
      element: (
        <PrivateRoute>
          <MyReviews />
        </PrivateRoute>
      ),
    },
  ];

  const adminRoutes = [
    {
      path: "statistics",
      element: (
        <PrivateRoute>
          <AppStatistics />
        </PrivateRoute>
      ),
    },
    {
      path: "users",
      element: (
        <PrivateRoute>
          <AllUsers />
        </PrivateRoute>
      ),
    },
    {
      path: "delivery-mens",
      element: (
        <PrivateRoute>
          <AllDeliveryMens />
        </PrivateRoute>
      ),
    },
    {
      path: "all-parcels",
      element: (
        <PrivateRoute>
          <AllParcels />
        </PrivateRoute>
      ),
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
