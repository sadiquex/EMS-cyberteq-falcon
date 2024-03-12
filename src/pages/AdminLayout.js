// contains routes for the admin dashboard

import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Employees from "./admin/Employees";
import Leaves from "./admin/Leaves";

import Sidebar from "../components/admin/Sidebar";
import Header from "../components/_ui/Header";
import Profile from "./employee/Profile";
import CompleteProfile from "./employee/CompleteProfile";
import SensitiveData from "./employee/SensitiveData";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-[80px,1fr] md:grid-cols-[256px,1fr] grid-rows-[60px,1fr]">
      {/* taking row - horizontal */}
      <header className="col-span-2">
        <Header />
      </header>
      {/* taking column - vertical (200px) */}
      <aside className="col-span-1">
        <Sidebar />
      </aside>
      {/* main content */}
      {/* taking column - vertical (1fr) */}
      <main className="col-span-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/sensitive-data" element={<SensitiveData />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leaves" element={<Leaves />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
