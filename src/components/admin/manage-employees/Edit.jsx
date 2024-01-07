import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";
import Button from "../../_ui/Button";

export default function Edit({
  selectedEmployee,
  setIsEditing,
  employees,
  setEmployees,
}) {
  const { firstName, lastName, email, id, date, role, department } =
    selectedEmployee;

  const [newEmployee, setNewEmployee] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    id: id,
    date: date,
    role: role,
    department: department,
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      id: newEmployee.id,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      role: newEmployee.role,
      department: newEmployee.department,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === newEmployee.id) {
        employees.splice(i, 1, updatedEmployee);
        break;
      }
    }

    setEmployees([...employees]);
    setIsEditing(false);
  };

  return (
    <Modal>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-bold text-center text-slate-900">
            Update Employee Details
          </h2>
          <button
            type="button"
            className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={() => setIsEditing(false)}
          >
            <IoCloseSharp />
          </button>
        </div>
        {/* input fields */}
        <label htmlFor="firstName" className="block text-sm font-medium ">
          First Name
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          // id="firstName"
          name="firstName"
          value={newEmployee.firstName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, firstName: e.target.value })
          }
        />
        <label htmlFor="lastName" className="block text-sm font-medium ">
          Last Name
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          // id="lastName"
          name="lastName"
          value={newEmployee.lastName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, lastName: e.target.value })
          }
        />
        <label htmlFor="email" className="block text-sm font-medium ">
          Email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          // id="email"
          name="email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
        />

        <label htmlFor="role" className="block text-sm font-medium ">
          Role
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          // id="role"
          name="role"
          value={newEmployee.role}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, role: e.target.value })
          }
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
}
