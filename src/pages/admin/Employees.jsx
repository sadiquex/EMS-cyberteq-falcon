import React, { useState } from "react";
import EmployeesTable from "../../components/admin/manage-employees/EmployeesTable";
import Add from "../../components/admin/manage-employees/Add";
import Edit from "../../components/admin/manage-employees/Edit";
import { useSelector } from "react-redux";

export default function Employees() {
  const employees = useSelector((state) => state.employees);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // find the employee we want to edit
  const editHandler = (id) => {
    // employee which has been clicked
    const [employee] = employees.filter((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2>Manage Employees</h2>
        <button
          className="bg-primaryColor text-white rounded-full p-4 hover:brightness-110 min-w-[140px]"
          onClick={() => setIsAdding(!isAdding)}
        >
          + Add Employee
        </button>
      </div>
      <div className="w-full">
        <EmployeesTable editHandler={editHandler} />
      </div>

      {/* adding */}
      {isAdding && (
        <div className="flex items-center justify-center">
          <Add setIsAdding={setIsAdding} />
        </div>
      )}
      {/* editing */}
      {isEditing && (
        <div className="flex items-center justify-center">
          <Edit
            setIsEditing={setIsEditing}
            selectedEmployee={selectedEmployee}
          />
        </div>
      )}
    </div>
  );
}
