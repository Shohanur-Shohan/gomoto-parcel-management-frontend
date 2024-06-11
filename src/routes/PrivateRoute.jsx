import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [Auth] = useAuth();
  const { user, loading } = Auth;
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ form: location }} replace />;
};
PrivateRoute.propTypes = {
  children: PropTypes.element,
};
export default PrivateRoute;
