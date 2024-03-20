import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminLayout";
import EmployeeLayout from "./pages/EmployeeLayout";
import ManagerLayout from "./pages/ManagerLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ChangeDefaultPassword from "./pages/ChangeDefaultPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import CeoLayout from "./pages/CeoLayout";

export default function App() {
  const isAuthenticated = useSelector((state) => state.user?.userDetails);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Routes for admin */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />} path="/admin/*" />
        </Route>

        {/* Routes for user */}
        <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
          <Route element={<EmployeeLayout />} path="/employee/*" />
        </Route>

        {/* Routes for manager */}
        <Route element={<ProtectedRoutes allowedRoles={["manager"]} />}>
          <Route element={<ManagerLayout />} path="/manager/*" />
        </Route>

        {/* Routes for CEO */}
        <Route element={<ProtectedRoutes allowedRoles={["CEO"]} />}>
          {/* ceo layout haer */}
        </Route>
        <Route element={<CeoLayout />} path="/ceo/*" />

        {/* Route for change default password */}
        <Route
          path="/change-default-password"
          element={
            isAuthenticated ? (
              <ChangeDefaultPassword />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Page not found */}
        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}
