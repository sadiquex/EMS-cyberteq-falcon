"use client";

import { useState } from "react";

export default function Add({ setIsAdding, employees, setEmployees }) {
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: employees.length + 1,
  });

  const addNew = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, id } = newEmployee;
    if (!firstName || !lastName || !id) {
      alert("Please enter details for employee");
    } else {
      setNewEmployee("");
      setEmployees([...employees, newEmployee]);
      setIsAdding(false);
    }
  };

  return (
    <div className="h-[80vh] w-[800px] mx-auto bg-red-50 absolute top-0 mt-5">
      <form onSubmit={addNew}>
        <h2 className="text-[30px] font-bold text-center text-slate-900">
          Add an employee
        </h2>
        {/* input fields */}
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={newEmployee.firstName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, firstName: e.target.value })
          }
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={newEmployee.lastName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, lastName: e.target.value })
          }
        />
        <button className="bg-blue-600" type="submit">
          add
        </button>
      </form>
      <button onClick={() => setIsAdding(false)} className="bg-gray-300">
        cancel
      </button>
    </div>
  );
}
