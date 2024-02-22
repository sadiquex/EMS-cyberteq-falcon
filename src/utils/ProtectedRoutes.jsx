import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/features/UserSlice";

const ProtectedRoutes = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user?.userDetails);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logOut());
  };

  // user authentication
  if (!user) {
    handleLogout();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // role based routing
  if (!allowedRoles.includes(user.role)) {
    // if the user tries to access a role they don't have, call the logout function
    handleLogout();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
