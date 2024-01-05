import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";

export default function Edit({
  selectedEmployee,
  setIsEditing,
  employees,
  setEmployees,
}) {
  const { firstName, lastName, email, id, date, salary } = selectedEmployee;

  const [newEmployee, setNewEmployee] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    id: id,
    date: date,
    salary: salary,
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      id: newEmployee.id,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
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
            Update Employee
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
        <button
          type="submit"
          className="bg-primaryColor text-white rounded-full p-4 hover:brightness-110 min-w-[140px]"
        >
          Update
        </button>
      </form>
    </Modal>
  );
}
