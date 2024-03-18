import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user?.userDetails);
  const location = useLocation();

  // user authentication
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // role based routing
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
