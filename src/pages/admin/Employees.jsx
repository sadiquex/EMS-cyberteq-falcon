import { useState } from "react";
import EmployeesTable from "../../components/admin/manage-employees/EmployeesTable";
import Add from "../../components/admin/manage-employees/Add";
import Edit from "../../components/admin/manage-employees/Edit";
import useEmployees from "../../hooks/useEmployees";
import Button from "../../components/_ui/Button";

export default function Employees() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { isLoading, error, employees, refetch } = useEmployees();

  // find the employee we want to edit
  const editHandler = (id) => {
    // employee which has been clicked
    const [employee] = employees?.filter((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  return (
    <div className="flex-1 flex flex-col gap-2 p-1">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-2">
        <h2>Manage Employees</h2>
        <Button onClick={() => setIsAdding(!isAdding)}>+ Add Employee</Button>
      </div>
      <div className="w-full">
        <EmployeesTable editHandler={editHandler} employees={employees} />
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
