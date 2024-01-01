import React, { useState } from "react";

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

    // setEmployees(employees);
    setEmployees([...employees]);
    setIsEditing(false);
  };

  return (
    <div className="h-[80vh] w-[800px] mx-auto bg-red-50 absolute top-0 mt-5">
      <form onSubmit={handleUpdate}>
        <h2 className="text-[30px] font-bold text-center text-slate-900">
          Update Employee
        </h2>
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
        <button type="submit">update</button>
      </form>
    </div>
  );
}
