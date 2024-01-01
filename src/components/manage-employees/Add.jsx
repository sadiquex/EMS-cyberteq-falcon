import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";

export default function Add({ setIsAdding, employees, setEmployees }) {
  const { register, handleSubmit, reset } = useForm();

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: employees.length + 1,
  });

  const isEmployeeAlreadyAdded = (firstName, lastName) => {
    return employees.some(
      (employee) =>
        employee.firstName === firstName && employee.lastName === lastName
    );
  };

  const addNew = (data) => {
    const { firstName, lastName } = data;

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
      email: "",
      id: newEmployee.id + 1, // Increment the ID for the next employee
    };

    // pass data to the api function
    setEmployees([...employees, updatedEmployee]);
    setNewEmployee(updatedEmployee); // Update newEmployee state
    reset(); // Clear the form fields
    setIsAdding(false);
  };

  return (
    // modal container
    <div className="bg-gray-500 bg-opacity-25	 z-50 h-screen w-full fixed top-0 left-0 flex items-center justify-center">
      {/* main modal */}
      <div className="overflow-y-auto overflow-x-hidden  justify-center items-center bg-white md:inset-0 w-[30vw] min-h-[calc(90%-1rem)] p-4 ">
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
          <label htmlFor="firstName" className="block text-sm font-medium ">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
          <label htmlFor="lastName" className="block text-sm font-medium ">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />

          <button
            className="bg-primaryColor text-white rounded-full p-4 hover:brightness-110 min-w-[140px]"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
