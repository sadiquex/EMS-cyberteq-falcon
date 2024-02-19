import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CompleteProfile from "./employee/CompleteProfile";
import Leave from "./employee/Leave";
import Dashboard from "./employee/Dashboard";
import LeaveStatusTable from "./employee/LeaveStatusTable";
import ConferenceRoom from "./employee/ConferenceRoom";
import Lunch from "./employee/Lunch";
import Profile from "./employee/Profile";
import Sidebar from "../components/employee/Sidebar";
import Header from "../components/_ui/Header";
import { LeaveProvider } from "../contexts/LeaveContext";

function EmployeeLayout() {
  const { employmentType } = useSelector((state) => state.user?.userDetails);

  return (
    <div className="grid grid-cols-[80px,1fr] md:grid-cols-[256px,1fr] grid-rows-[60px,1fr] ">
      <header className="col-span-2">
        <Header />
      </header>
      <aside className="col-span-1">
        <Sidebar />
      </aside>
      <LeaveProvider>
        <main className="col-span-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/leave" element={<Leave />} />
            {employmentType === "FTIME" && (
              <Route path="/leave-status" element={<LeaveStatusTable />} />
            )}
            <Route path="/profile" element={<Profile />} />
            <Route path="/lunch" element={<Lunch />} />
            <Route path="/conference-room" element={<ConferenceRoom />} />
            <Route
              path="/*"
              element={<Navigate to="/employee/dashboard" replace />}
            />
          </Routes>
        </main>
      </LeaveProvider>
    </div>
  );
}

export default EmployeeLayout;
