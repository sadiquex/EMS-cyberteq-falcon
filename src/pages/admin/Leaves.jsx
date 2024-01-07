import React from "react";
import LeavesTable from "../../components/admin/manage-leaves/LeavesTable";

export default function Leaves() {
  return (
    <div className=" flex flex-col gap-2">
      <h2>Leaves Applied</h2>
      <LeavesTable />
    </div>
  );
}
