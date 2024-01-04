import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminLayout";
import EmployeeLayout from "./pages/EmployeeLayout";

export default function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <div className="bg-blue-100">
      <Routes>
        {isLoginPage && <Route path="/" element={<LoginPage />} />}
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/employee/*" element={<EmployeeLayout />} />
      </Routes>
    </div>
  );
}
