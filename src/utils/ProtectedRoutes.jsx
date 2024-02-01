import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user?.userDetails);
  // const user = "adfa";

  const location = useLocation();

  return !user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
