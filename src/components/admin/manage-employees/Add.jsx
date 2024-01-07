import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";

export default function Add({ setIsAdding, employees, setEmployees }) {
  const { register, handleSubmit, reset } = useForm();

  const date = new Date();
  const currentDate = date.toISOString().split("T")[0];

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
    dateAdded: "",
    id: employees.length + 1,
  });

  const isEmployeeAlreadyAdded = (firstName, lastName) => {
    return employees.some(
      (employee) =>
        employee.firstName === firstName && employee.lastName === lastName
    );
  };

  const addNew = (data) => {
    const { firstName, lastName, email, role, department } = data;

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
      role,
      department,
      dateAdded: currentDate,
      id: newEmployee.id + 1, // Increment the ID for the next employee
    };

    // pass data to the api function here
    setEmployees([...employees, updatedEmployee]);
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
          First Name
        </label>
        <input
          {...register("firstName")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* lastname */}
        <label htmlFor="lastName" className="block text-sm font-medium ">
          Last Name
        </label>
        <input
          {...register("lastName")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* email */}
        <label htmlFor="email" className="block text-sm font-medium ">
          Email
        </label>
        <input
          {...register("email")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* department */}
        <label htmlFor="department" className="block text-sm font-medium ">
          Department
        </label>
        <input
          {...register("department")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        {/* role */}
        <label htmlFor="role" className="block text-sm font-medium ">
          Role
        </label>
        <input
          {...register("role")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />

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
