import { useState } from "react";
import Modal from "../../_ui/Modal";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import API from "../../../api/axios";
import { toast } from "react-toastify";
import { TableSkeleton } from "../../_ui/Skeletons";
import { FullScreenSpinner } from "../../_ui/Spinner";
import EmployeeDetails from "./EmployeeDetails";
import { useQueryClient } from "@tanstack/react-query";

export default function EmployeesTable({ editHandler, employees }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  if (!Array.isArray(employees)) {
    return <TableSkeleton />;
  }

  // Separate first and last names
  const employeesWithSeparatedNames = employees.map((employee) => {
    const nameParts = employee.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" "); // Join the remaining parts as the last name
    return {
      ...employee,
      firstName,
      lastName,
    };
  });

  // Filter employees by first name based on searchTerm
  const filteredEmployees = employeesWithSeparatedNames.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // VIEW details
  const viewDetailsHandler = async (id) => {
    setLoading(true);
    try {
      const response = await API.get(`/Users/user-profile/${id}`);
      if (response.status === 200) {
        setSelectedEmployee(response.data?.result);
      }
    } catch (error) {
      // toast.error(error.response.data?.errorMessages);
      toast.warning("Employee must complete their profile details");
    } finally {
      setLoading(false);
    }
  };

  // DELETE employee
  const deleteEmployeeHandler = async (employeeId) => {
    try {
      const response = await API.delete(`/Users/${employeeId}`);
      if (response.status === 200) {
        toast.success("Employee deleted successfully");
        // Invalidate the query to trigger a refetch
        queryClient.invalidateQueries("employees");
      } else {
        console.error(
          "Failed to delete employee:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during employee deletion:", error);
      toast.error("Failed to delete employee");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedEmployee(null);

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
        {filteredEmployees?.length > 0 ? (
          <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-700 whitespace-nowrap px-2">
            {/* table heading */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr className="text-[16px] space-x-4">
                <th className="py-3 px-4">ID</th>
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
              {filteredEmployees?.length > 0 ? (
                filteredEmployees?.map((employee, i) => (
                  // row
                  <tr key={i} className="bg-white px-4 hover:bg-orange-50 ">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department.name}</td>
                    <td>{employee.employmentType.name}</td>
                    {/* <td>{employee.dateAdded}</td> */}

                    {/* action btns */}
                    <td className="space-x-2 text-[20px] ">
                      {/* view btn */}
                      <button onClick={() => viewDetailsHandler(employee.id)}>
                        <FaEye />
                      </button>
                      {/* edit btn */}
                      <button
                        onClick={() => editHandler(employee.id)}
                        className="text-red-500"
                      >
                        <MdOutlineEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to delete")
                          ) {
                            deleteEmployeeHandler(employee.id);
                          }
                        }}
                        className="text-red-600"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <TableSkeleton />
              )}
            </tbody>
          </table>
        ) : (
          // <p>Sorry, no employee found</p>
          <TableSkeleton />
        )}
      </div>

      {/* Modal for View Details */}
      {loading ? (
        <FullScreenSpinner />
      ) : (
        selectedEmployee && (
          <Modal type="employeeDetails" closeModal={closeModal}>
            <EmployeeDetails selectedEmployee={selectedEmployee} />
          </Modal>
        )
      )}
    </div>
  );
}
