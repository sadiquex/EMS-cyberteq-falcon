// file to manage employees' routes

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// pages
import Profile from "./employee/Profile";
import SensitiveData from "./employee/SensitiveData";
import Lunch from "./employee/Lunch";
import ConferenceRoom from "./employee/ConferenceRoom";
import CompleteProfile from "./employee/CompleteProfile";
import Leave from "./employee/Leave";
import Dashboard from "./employee/Dashboard";

// components
import Header from "../components/_ui/Header";
import LeaveStatusTable from "./employee/LeaveStatusTable";

// contects
import { LeaveProvider } from "../contexts/LeaveContext";
import Sidebar from "../components/_ui/Sidebar";

function EmployeeLayout() {
  const { employmentType } = useSelector((state) => state.user?.userDetails);

  return (
    <div className="grid grid-cols-[80px,1fr] md:grid-cols-[220px,1fr] grid-rows-[70px,1fr] ">
      <header className="col-span-2">
        <Header />
      </header>
      <aside className="col-span-1">
        <Sidebar />
      </aside>
      <LeaveProvider>
        <main className="col-span-1 p-4 mx-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/sensitive-data" element={<SensitiveData />} />
            <Route path="/leave" element={<Leave />} />
            {employmentType === "FTIME" && (
              <Route path="/leave-status" element={<LeaveStatusTable />} />
            )}
            <Route path="/profile" element={<Profile />} />
            <Route path="/lunch" element={<Lunch />} />
            <Route path="/conference-room" element={<ConferenceRoom />} />

            {/* all other routes */}
            <Route path="/*" element={<div>Page not found</div>} />
          </Routes>
        </main>
      </LeaveProvider>
    </div>
  );
}

export default EmployeeLayout;
