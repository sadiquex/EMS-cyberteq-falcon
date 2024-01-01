import React from "react";
import LeavesTable from "../components/manage-leaves/LeavesTable";

export default function Leaves() {
  return (
    <div className="flex-1 p-10 flex flex-col gap-2">
      <h2>Leaves Applied</h2>

      <div className="w-full">
        <LeavesTable />
      </div>
    </div>
  );
}
