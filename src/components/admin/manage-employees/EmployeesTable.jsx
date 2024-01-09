import { useState } from "react";
import Modal from "../../_ui/Modal";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
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

  return (
    <div className="w-[350px] md:w-full overflow-x-auto p-[1px]">
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
            <tr className="text-[16px] space-x-4">
              <th className="py-3">ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th className="">Email</th>
              <th>Department</th>
              <th className="">Employment Type</th>
              <th className="">Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {filteredEmployees?.length > 0 ? (
              filteredEmployees?.map((employee, i) => (
                // row
                <tr key={i} className="bg-white hover:bg-gray-50 ">
                  <td className="py-3 ">{i + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.employmentType}</td>
                  <td>{employee.dateAdded}</td>
                  <td className="space-x-2 text-[20px] ">
                    <button onClick={() => viewDetailsHandler(employee.id)}>
                      <FaEye />
                    </button>
                    <button
                      onClick={() => editHandler(employee.id)}
                      className="text-red-500"
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="text-red-600"
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
      </div>

      {/* Modal for View Details */}
      {selectedEmployee && (
        <Modal>
          <div className="flex flex-col h-full">
            {/* heading */}
            <div className="flex justify-between items-center">
              <h2 className="text-[30px] font-bold text-center text-slate-900">
                Employee Details
              </h2>

              <button
                type="button"
                className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => setSelectedEmployee(null)}
              >
                <IoCloseSharp />
              </button>
            </div>
            {/* details */}
            <div className="flex flex-col justify-between flex-1">
              <table className="border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">ID:</td>
                    <td className="border border-gray-300 p-2">
                      {selectedEmployee.id}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">First Name:</td>
                    <td className="border border-gray-300 p-2">
                      {selectedEmployee.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Last Name:</td>
                    <td className="border border-gray-300 p-2">
                      {selectedEmployee.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Email:</td>
                    <td className="border border-gray-300 p-2">
                      {selectedEmployee.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Department:</td>
                    <td className="border border-gray-300 p-2">
                      {selectedEmployee.department}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Date Added:</td>
                    <td className="border border-gray-300 p-2">
                      {selectedEmployee.date}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
