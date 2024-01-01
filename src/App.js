import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leaves from "./pages/Leaves";
import Lunch from "./pages/Lunch";
import Sidebar from "./components/Sidebar";
import Conference from "./pages/Conference";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar className="flex-1" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/conference" element={<Conference />} />
        </Routes>
      </div>
    </div>
  );
}
