// contains employees' routes

import { Routes, Route } from "react-router-dom";
// pages
import CompleteProfile from "./employee/CompleteProfile";
import Dashboard from "./manager/Dashboard";
import Lunch from "./employee/Lunch";
import Profile from "./employee/Profile";

// components
import Sidebar from "../components/manager/Sidebar";
import Header from "../components/_ui/Header";

// contexts
import { LeaveProvider } from "../contexts/LeaveContext";
import Leaves from "./manager/Leaves";
import EmployeesTable from "../components/manager/EmployeesTable";

function ManagerLayout() {
  return (
    <div className="grid grid-cols-[80px,1fr] md:grid-cols-[256px,1fr] grid-rows-[60px,1fr] ">
      <header className="col-span-2">
        {/* header */}
        <Header />
      </header>
      <aside className="col-span-1">
        <Sidebar />
      </aside>
      {/* for providing context */}
      <LeaveProvider>
        {/* main content */}
        <main className="col-span-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/lunch" element={<Lunch />} />
            <Route path="/employees" element={<EmployeesTable />} />
            {/* <Route path="/conference-room" element={<ConferenceRoom />} /> */}
            <Route path="/*" element={<div>Page not found</div>} />
          </Routes>
        </main>
      </LeaveProvider>
    </div>
  );
}

export default ManagerLayout;
