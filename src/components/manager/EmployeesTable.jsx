import React, { useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import Modal from "../_ui/Modal";
import EmployeeDetails from "../admin/manage-employees/EmployeeDetails";
import { TableSkeleton } from "../_ui/Skeletons";
import { useSelector } from "react-redux";
import useEmployees from "../../hooks/useEmployees";

export default function EmployeesTable({ editHandler }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { userDetails } = useSelector((state) => state.user);
  const managerDepartmentId = userDetails.departmentId;
  const { isLoading, error, employees, refetch } = useEmployees();

  // query employees with the same department id as manager
  const filteredEmployees = employees
    ?.filter((employee) => employee.department.id === managerDepartmentId)
    ?.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((employee) => {
      // Separate first and last names
      const nameParts = employee.name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" "); // Join the remaining parts as the last name
      return {
        ...employee,
        firstName,
        lastName,
      };
    });

  // View details handler
  const viewDetailsHandler = async (id) => {
    try {
      const response = await API.get(`/Users/user-profile/${id}`);
      if (response.status === 200) {
        setSelectedEmployee(response.data.result);
      }
    } catch (error) {
      // toast.error(error.response.data.errorMessages);
      toast.warning("User must complete their profile to view details");
    }
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
        {isLoading ? (
          <TableSkeleton />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : filteredEmployees?.length > 0 ? (
          <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-700 whitespace-nowrap px-2">
            {/* table heading */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr className="text-[16px] space-x-4">
                <th className="py-3 px-4">No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Employment Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {filteredEmployees.map((employee, i) => (
                // row
                <React.Fragment key={i}>
                  <tr key={i} className="bg-white px-4 hover:bg-orange-50">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department.name}</td>
                    <td>{employee.employmentType.name}</td>
                    <td className="space-x-2">
                      <button
                        className="bg-transparent text-blue-700 rounded-sm py-2 px-4 border-2 border-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-primaryColor "
                        onClick={() => viewDetailsHandler(employee.id)}
                      >
                        VIEW
                      </button>

                      {/* edit btn */}
                      {/* <button
                      // onClick={() => editHandler(employee.id)}
                      className="text-red-500"
                    >
                      <MdOutlineEdit />
                    </button> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <hr
                        style={{ border: "1px solid #E5E7EB", margin: "0" }}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Sorry, no employee found</p>
        )}
      </div>

      {/* Modal for View Details */}
      {selectedEmployee && (
        <Modal
          type="employeeDetails"
          closeModal={() => setSelectedEmployee(null)}
        >
          <EmployeeDetails selectedEmployee={selectedEmployee} />
        </Modal>
      )}
    </div>
  );
}
