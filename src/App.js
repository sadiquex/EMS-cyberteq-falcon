import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminLayout";
import EmployeeLayout from "./pages/EmployeeLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ChangeDefaultPassword from "./pages/ChangeDefaultPassword";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/change-default-password"
        element={<ChangeDefaultPassword />}
      />

      {/* protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />} path="/admin/*" />
        <Route element={<EmployeeLayout />} path="/employee/*" />
      </Route>

      {/* all other routes */}
      <Route path="/*" element={<div>Page not found</div>} />
    </Routes>
  );
}

// abigailaidoo613@gmail.com
// 123456Aa!
