import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminLayout";
import EmployeeLayout from "./pages/EmployeeLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ChangeDefaultPassword from "./pages/ChangeDefaultPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerLayout from "./pages/ManagerLayout";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* protected routes */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />} path="/admin/*" />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
          <Route element={<EmployeeLayout />} path="/employee/*" />
          <Route
            path="/change-default-password"
            element={<ChangeDefaultPassword />}
          />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["manager"]} />}>
          <Route element={<ManagerLayout />} path="/manager/*" />
        </Route>

        {/* all other routes */}
        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

// 123456Aa!
// Secure123.
