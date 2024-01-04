// !!!!

// contains routes for the admin dashboard

import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Employees from "./admin/Employees";
import Leaves from "./admin/Leaves";
import Lunch from "./admin/Lunch";
import ConferenceRoom from "./admin/ConferenceRoom";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/conference-room" element={<ConferenceRoom />} />
        </Routes>
      </Sidebar>
    </>
  );
}
