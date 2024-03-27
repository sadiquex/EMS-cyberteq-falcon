// contains routes for the admin dashboard

import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Employees from "./admin/Employees";
import Leaves from "./admin/Leaves";

import Sidebar from "../components/_ui/Sidebar";
import Header from "../components/_ui/Header";
import Profile from "./employee/Profile";
import CompleteProfile from "./employee/CompleteProfile";
import SensitiveData from "./employee/SensitiveData";
import Leave from "./employee/Leave";
import { LeaveProvider } from "../contexts/LeaveContext";
import LeaveStatusTable from "./employee/LeaveStatusTable";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-[80px,1fr] md:grid-cols-[260px,1fr] grid-rows-[70px,1fr] gap-4">
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
      <LeaveProvider>
        <main className="col-span-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sensitive-data" element={<SensitiveData />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/leave-status" element={<LeaveStatusTable />} />

            <Route path="/leaves" element={<Leaves />} />
            {/* admin - APPLY for leave */}
            <Route path="/leave" element={<Leave />} />

            <Route path="/complete-profile" element={<CompleteProfile />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/*" element={<div>Page not found</div>} />
          </Routes>
        </main>
      </LeaveProvider>
    </div>
  );
}
