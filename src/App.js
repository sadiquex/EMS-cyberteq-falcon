import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leaves from "./pages/Leaves";
import Lunch from "./pages/Lunch";
import Sidebar from "./components/Sidebar";
import ConferenceRoom from "./pages/ConferenceRoom";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const location = useLocation();

  // Check if the current route is the LoginPage
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      {/* Conditionally render Navbar and Sidebar based on the current route */}
      {!isLoginPage && <Navbar />}
      {!isLoginPage && (
        <div className="flex">
          <Sidebar className="flex-1" />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/lunch" element={<Lunch />} />
            <Route path="/conference" element={<ConferenceRoom />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
