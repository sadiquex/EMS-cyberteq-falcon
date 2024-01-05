import { useState } from "react";
import Modal from "../../_ui/Modal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

export default function EmployeesTable({
  employees,
  setEmployees,
  editHandler,
}) {
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
        className="block w-full md:w-1/3 p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 mb-4"
      />

      <div className="w-full overflow-x-auto">
        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-700 whitespace-nowrap">
          {/* head */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="text-[16px]">
              <th className="py-3 hidden md:table-cell">ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th>Department</th>
              <th className="hidden md:table-cell">Role</th>
              <th className="hidden md:table-cell">Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {filteredEmployees?.length > 0 ? (
              filteredEmployees?.map((employee, i) => (
                // row
                <tr key={i} className="bg-white hover:bg-gray-50 ">
                  <td className="py-3 hidden md:table-cell">{i + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td className="hidden md:table-cell">{employee.email}</td>
                  <td>{employee.department}</td>
                  <td className="hidden md:table-cell">{employee.role}</td>
                  <td className="hidden md:table-cell">{employee.date}</td>
                  <td className="space-x-2 text-[20px] ">
                    <button onClick={() => viewDetailsHandler(employee.id)}>
                      <FaEye />
                    </button>
                    <button onClick={() => editHandler(employee.id)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteEmployee(employee.id)}>
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
      </div>

      {/* Modal for View Details */}
      {selectedEmployee && (
        <Modal>
          <div className="modal-content">
            <div className="flex justify-between items-center">
              <h2 className="text-[30px] font-bold text-center text-slate-900">
                Employee Details
              </h2>

              <button
                type="button"
                className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={closeModal}
              >
                <IoCloseSharp />
              </button>
            </div>
            <p>ID: {selectedEmployee.id}</p>
            <p>First Name: {selectedEmployee.firstName}</p>
            <p>Last Name: {selectedEmployee.lastName}</p>
            <p>Email: {selectedEmployee.email}</p>
            <p>Department: {selectedEmployee.department}</p>
            <p>Date Added: {selectedEmployee.date}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
