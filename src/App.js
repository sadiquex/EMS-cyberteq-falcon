import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminLayout";
import EmployeeLayout from "./pages/EmployeeLayout";

export default function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <Routes>
      {isLoginPage && <Route path="/" element={<LoginPage />} />}
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/employee/*" element={<EmployeeLayout />} />
      <Route path="/*" element={<div>No route found</div>} />
    </Routes>
  );
}
