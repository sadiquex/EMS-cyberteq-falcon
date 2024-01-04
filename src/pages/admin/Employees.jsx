import React, { useState } from "react";
import EmployeesTable from "../../components/admin/manage-employees/EmployeesTable";
import { employeesData as data } from "../../data";
import Add from "../../components/admin/manage-employees/Add";
import Edit from "../../components/admin/manage-employees/Edit";

export default function Employees() {
  const [employees, setEmployees] = useState(data);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const editHandler = (id) => {
    // employee which has been clicked
    const [employee] = employees.filter((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  return (
    <div className="flex-1 p-10 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2>Manage Employees</h2>
        <button
          className="bg-primaryColor text-white rounded-full p-4 hover:brightness-110"
          onClick={() => setIsAdding(!isAdding)}
        >
          + Add Employee
        </button>
      </div>
      <div className="w-full">
        <EmployeesTable
          employees={employees}
          setEmployees={setEmployees}
          editHandler={editHandler}
        />
      </div>

      {/* adding */}
      {isAdding && (
        <div className="flex items-center justify-center">
          <Add
            setIsAdding={setIsAdding}
            employees={employees}
            setEmployees={setEmployees}
          />
        </div>
      )}
      {/* editing */}
      {isEditing && (
        <div className="flex items-center justify-center">
          <Edit
            setIsEditing={setIsEditing}
            employees={employees}
            setEmployees={setEmployees}
            selectedEmployee={selectedEmployee}
          />
        </div>
      )}
    </div>
  );
}
