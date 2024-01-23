import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";
import Button from "../../_ui/Button";
import { useDispatch } from "react-redux";
import { editEmployee } from "../../../features/admin-slices/adminEmployeesSlice";

export default function Edit({ selectedEmployee, setIsEditing }) {
  const dispatch = useDispatch();
  // destructure selected employee object
  const [newEmployee, setNewEmployee] = useState({ ...selectedEmployee });

  const onEditEmployee = (updatedEmployee) => {
    dispatch(
      editEmployee({
        id: selectedEmployee.id,
        updatedEmployeeData: updatedEmployee,
      })
    );
    setIsEditing(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    onEditEmployee(newEmployee);
    setIsEditing(false);
  };

  const closeModal = () => setIsEditing(false);

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-bold text-center text-slate-900">
            Update Employee Details
          </h2>
          <button
            type="button"
            className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={closeModal}
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
          name="lastName"
          value={newEmployee.lastName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, lastName: e.target.value })
          }
        />
        {/* email */}
        <label htmlFor="email" className="block text-sm font-medium ">
          Email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="email"
          placeholder="employeemail@cyberteq.com"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
        />

        {/* phoneNumber */}
        <label htmlFor="phoneNumber" className="block text-sm font-medium ">
          Phone Number
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="phoneNumber"
          type="number"
          placeholder="+233 50 369 9012"
          value={newEmployee.phoneNumber}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })
          }
        />

        {/* role */}
        <label htmlFor="role" className="block text-sm font-medium ">
          Role
        </label>
        <select
          // {...register("role")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={newEmployee.role}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, role: e.target.value })
          }
        >
          <option value="" disabled hidden>
            --Select role--
          </option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>

        {/* department */}
        <label htmlFor="department" className="block text-sm font-medium ">
          Department
        </label>
        <select
          value={newEmployee.department}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, department: e.target.value })
          }
        >
          <option value="--Select Department--">--Select Department--</option>
          <option value="SOC">SOC</option>
          <option value="InfoSec">InfoSec</option>
          <option value="Offensive">Offensive</option>
          <option value="BT Falcon">BT Falcon</option>
          <option value="Sales">Sales</option>
        </select>

        {/* employmentType */}
        <label htmlFor="employmentType" className="block text-sm font-medium ">
          Type of Employment
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="employmentType"
          value={newEmployee.employmentType}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              employmentType: e.target.value,
            })
          }
        >
          <option value="--Select Employment--">--Select Employment--</option>
          <option value="Internship">Internship</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Contract">Contract</option>
        </select>

        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
}
