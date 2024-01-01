import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Table({ employees, setEmployees, editHandler }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // delete handler
  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      const filteredEmployees = employees.filter(
        (employee) => employee.id !== id
      );
      setEmployees(filteredEmployees);
    }
  };

  // search handler
  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // view details
  const viewDetailsHandler = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by First Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        {/* head */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr className="text-[16px]">
            <th className="py-3">ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {filteredEmployees?.length > 0 ? (
            filteredEmployees?.map((employee, i) => (
              // row
              <tr
                key={i}
                className="bg-white hover:bg-gray-50 "
                onClick={() => viewDetailsHandler(employee.id)}
              >
                <td className="py-3">{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.date}</td>
                <td>
                  <button
                    onClick={() => editHandler(employee.id)}
                    className="text-[20px]"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="text-[24px]"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b  hover:bg-gray-50 ">
              <td colSpan={7}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for View Details */}
      {selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Employee Details</h2>
            <p>ID: {selectedEmployee.id}</p>
            <p>First Name: {selectedEmployee.firstName}</p>
            <p>Last Name: {selectedEmployee.lastName}</p>
            <p>Email: {selectedEmployee.email}</p>
            <p>Salary: {selectedEmployee.salary}</p>
            <p>Date: {selectedEmployee.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
