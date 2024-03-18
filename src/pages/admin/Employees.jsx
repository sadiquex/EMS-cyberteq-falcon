import React, { useState } from "react";
import EmployeesTable from "../../components/admin/manage-employees/EmployeesTable";
import Add from "../../components/admin/manage-employees/Add";
import Edit from "../../components/admin/manage-employees/Edit";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/axios";

export default function Employees() {
  // const employees = useSelector((state) => state.employees.employees);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // use react query to get the employees
  const {
    isLoading,
    isError,
    data: employees,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const response = await API.get(`/Users/`);

        if (response.status === 200) {
          return response.data?.result;
        } else if (response.status === 500) {
          toast.error("Server error");
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

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
        <button
          className="bg-secondaryColor text-primaryColor rounded-full p-4 hover:brightness-110 whitespace-nowrap"
          onClick={() => setIsAdding(!isAdding)}
        >
          + Add Employee
        </button>
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
