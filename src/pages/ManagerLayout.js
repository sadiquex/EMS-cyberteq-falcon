// file for manager's pages

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// pages
import CompleteProfile from "./employee/CompleteProfile";
import Dashboard from "./manager/Dashboard";
import Leaves from "./manager/Leaves";
import Lunch from "./employee/Lunch";
import Profile from "./employee/Profile";
import SensitiveData from "./employee/SensitiveData";
import Leave from "./employee/Leave";

// components
import Header from "../components/_ui/Header";
import EmployeesTable from "../components/manager/EmployeesTable";
import LeaveStatusTable from "./employee/LeaveStatusTable";

// contexts
import { LeaveProvider } from "../contexts/LeaveContext";
import ConferenceRoom from "./employee/ConferenceRoom";
import Sidebar from "../components/_ui/Sidebar";

function ManagerLayout() {
  const { employmentType } =
    useSelector((state) => state.user?.userDetails) || {};

  return (
    <div className="grid grid-cols-[80px,1fr] md:grid-cols-[260px,1fr] grid-rows-[70px,1fr] gap-4">
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
            {/* leaves - from THEIR DEPARTMENT */}
            <Route path="/leaves" element={<Leaves />} />
            {/* manager - APPLY for leave */}
            <Route path="/leave" element={<Leave />} />

            {employmentType === "FTIME" && (
              <Route path="/leave-status" element={<LeaveStatusTable />} />
            )}

            <Route path="/profile" element={<Profile />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/sensitive-data" element={<SensitiveData />} />
            <Route path="/employees" element={<EmployeesTable />} />

            <Route path="/lunch" element={<Lunch />} />
            <Route path="/conference-room" element={<ConferenceRoom />} />

            <Route path="/*" element={<div>Page not found</div>} />
          </Routes>
        </main>
      </LeaveProvider>
    </div>
  );
}

export default ManagerLayout;
