import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  // const user = useSelector((state) => state.user?.userDetails);

  // mock user - delete afterwards
  const user = "saddik";

  const location = useLocation();

  return !user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
