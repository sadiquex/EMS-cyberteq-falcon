import { useEffect, useState } from "react";
import Modal from "../../_ui/Modal";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  fetchUsers,
} from "../../../redux/features/admin-slices/adminEmployeesSlice";
import API from "../../../api/axios";
import { toast } from "react-toastify";
import { TableSkeleton } from "../../_ui/Skeletons";
import ViewEmployeeDetails from "./ViewEmployeeDetails";

export default function EmployeesTable({ editHandler }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!Array.isArray(employees)) {
    return <div>Loading...</div>;
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

  // VIEW details
  const viewDetailsHandler = async (id) => {
    //  --- this approach also works ---
    const employee = employeesWithSeparatedNames.find((emp) => emp.id === id);
    setSelectedEmployee(employee);

    // hit the employee details endpoint
    // try {
    //   const response = await API.get(`/Users/user-profile/${id}`);
    //   if (response.statusCode === 200) {
    //     // setSelectedEmployee(employee);
    //     console.log(response.data);
    //   }
    // } catch (error) {
    //   toast.error(error)
    //   console.log(error);
    // }
  };

  // DELETE employee
  const deleteEmployeeHandler = async (employeeId) => {
    try {
      const response = await API.delete(`/Users/${employeeId}`);

      if (response.status === 200) {
        toast.success("Employee deleted successfully");

        // Update Redux store to remove the deleted employee
        dispatch(deleteEmployee(employeeId));
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
        {employeesWithSeparatedNames?.length > 0 ? (
          <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-700 whitespace-nowrap">
            {/* table heading */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr className="text-[16px] space-x-4">
                <th className="py-3">ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Employment Type</th>
                {/* <th>Date Added</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {employeesWithSeparatedNames?.length > 0 ? (
                employeesWithSeparatedNames?.map((employee, i) => (
                  // row
                  <tr key={i} className="bg-white hover:bg-gray-50 ">
                    <td className="py-3 ">{i + 1}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.employmentType}</td>
                    {/* <td>{employee.dateAdded}</td> */}
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
                            // dispatch(deleteEmployee(employee.id));
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
          <TableSkeleton />
        )}
      </div>

      {/* Modal for View Details */}
      {selectedEmployee && (
        <Modal closeModal={closeModal}>
          <ViewEmployeeDetails selectedEmployee={selectedEmployee} />
        </Modal>
      )}
    </div>
  );
}
