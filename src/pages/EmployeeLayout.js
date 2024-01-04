// contains employees' routes

import { Routes, Route } from "react-router-dom";
import Dashboard from "./employee/Dashboard";
import CompleteProfile from "./employee/CompleteProfile";
import Leave from "./employee/Leave";
import LeaveStatus from "./employee/LeaveStatus";
import Header from "../components/employee/Header";
import Sidebar from "../components/employee/Sidebar";

function EmployeeLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/dashbard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/leave-status" element={<LeaveStatus />} />
      </Routes>
    </>
  );
}

export default EmployeeLayout;
