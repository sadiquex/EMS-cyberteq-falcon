import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/AdminLayout";
import EmployeeLayout from "./pages/EmployeeLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />} path="/admin/*" />
        <Route element={<EmployeeLayout />} path="/employee/*" />
      </Route>

      {/* unknwn pages */}
      <Route path="/*" element={<div>Page not found</div>} />
    </Routes>
  );
}

// abigailaidoo613@gmail.com
// 123456Aa!
