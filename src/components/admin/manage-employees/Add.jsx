import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";

export default function Add({ setIsAdding, employees, setEmployees }) {
  const { register, handleSubmit, reset } = useForm();
  // state to set department depending on the role
  const [selectedRole, setSelectedRole] = useState("");

  const date = new Date();
  const currentDate = date.toISOString().split("T")[0];

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    role: "",
    employmentType: "",
    dateAdded: currentDate,
    id: employees.length + 1,
  });

  const isEmployeeAlreadyAdded = (firstName, lastName) => {
    return employees.some(
      (employee) =>
        employee.firstName === firstName && employee.lastName === lastName
    );
  };

  const addNew = (data) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      employmentType,
      department,
    } = data;

    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Please fill out all required fields");
      return;
    }

    if (isEmployeeAlreadyAdded(firstName, lastName)) {
      alert("Employee with the same name is already added");
      return;
    }

    const updatedEmployee = {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      employmentType,
      department,
      dateAdded: currentDate,
      id: newEmployee.id + 1, // Increment the ID for the next employee
    };

    // pass data to the api function here - hit the endpoint
    setEmployees([updatedEmployee, ...employees]);
    setNewEmployee(updatedEmployee);
    reset(); // Clear the form fields
    setIsAdding(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(addNew)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-bold text-center text-slate-900">
            Add an employee
          </h2>
          {/* cancel btn */}
          <button
            type="button"
            className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={() => setIsAdding(false)}
          >
            <IoCloseSharp />
          </button>
        </div>
        {/* input fields */}
        {/* firstname */}
        <label htmlFor="firstName" className="block text-sm font-medium ">
          First Name <span className="text-red-600">*</span>
        </label>
        <input
          placeholder="Ibrahim"
          {...register("firstName")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* lastname */}
        <label htmlFor="lastName" className="block text-sm font-medium ">
          Last Name <span className="text-red-600">*</span>
        </label>
        <input
          placeholder="Saddik"
          {...register("lastName")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* email */}
        <label htmlFor="email" className="block text-sm font-medium ">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          {...register("email")}
          placeholder="employeemail@cyberteq.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* phoneNumber */}
        <label htmlFor="phoneNumber" className="block text-sm font-medium ">
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          placeholder="+233 50 369 9012"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* role */}
        <label htmlFor="role" className="block text-sm font-medium ">
          Role <span className="text-red-600">*</span>
        </label>
        <select
          {...register("role")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          defaultValue="--Leave Type--"
        >
          <option value="--Select role--" disabled selected hidden>
            --Select role--
          </option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <label htmlFor="department" className="block text-sm font-medium ">
          Department <span className="text-red-600">*</span>
        </label>
        <select
          {...register("department")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="--Select Department--" disabled selected hidden>
            --Select Department--
          </option>
          <option value="SOC">SOC</option>
          <option value="InfoSec">InfoSec</option>
          <option value="Offensive">Offensive</option>
          <option value="BT Falcon">BT Falcon</option>
          <option value="Sales">Sales</option>
        </select>
        {/* employee type*/}
        <label htmlFor="role" className="block text-sm font-medium ">
          Employment Type <span className="text-red-600">*</span>
        </label>
        <select
          {...register("employmentType")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="--Select Employment--" disabled selected hidden>
            --Select Employment--
          </option>
          <option value="Internship">Internship</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Contract">Contract</option>
        </select>
        <button
          className="bg-primaryColor text-white rounded-full p-4 hover:brightness-110 min-w-[140px]"
          type="submit"
        >
          Add
        </button>
      </form>
    </Modal>
  );
}
