import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../../redux/admin-slices/adminEmployeesSlice";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Add({ setIsAdding }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // get employee types
  useEffect(() => {
    axios
      .get("https://cyberteq-falcon-api.onrender.com/api/EmploymentType")
      .then((response) => {
        setEmploymentTypes(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employment types:", error);
        setLoading(false);
      });
  }, []);

  // GET - departments, roles and employment types
  useEffect(() => {
    Promise.all([
      axios.get("https://cyberteq-falcon-api.onrender.com/api/EmploymentType"),
      axios.get("https://cyberteq-falcon-api.onrender.com/api/Department"),
      axios.get("https://cyberteq-falcon-api.onrender.com/api/Role"),
    ])
      .then(([employmentTypesResponse, departmentsResponse, rolesResponse]) => {
        setEmploymentTypes(employmentTypesResponse.data.result);
        setDepartments(departmentsResponse.data.result);
        setRoles(rolesResponse.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  console.log(departments);

  const date = new Date();
  const currentDate = date.toISOString().split("T")[0];

  // const isEmployeeAlreadyAdded = (firstName, lastName) => {
  //   return employees?.some(
  //     (employee) =>
  //       employee.firstName === firstName && employee.lastName === lastName
  //   );
  // };

  const addEmployeeHandler = async (data) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      employmentTypeId,
      departmentId,
    } = data;

    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Please fill out all required fields");
      return;
    }

    // if (isEmployeeAlreadyAdded(firstName, lastName)) {
    //   alert("Employee with the same name is already added");
    //   return;
    // }

    const newEmployee = {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      employmentTypeId,
      departmentId,
      // dateAdded: currentDate,
    };

    try {
      const response = await axios.post(
        "https://cyberteq-falcon-api.onrender.com/api/Users/register-user",
        newEmployee,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("successfully added", response.data);

        dispatch(addEmployee(newEmployee));
        reset(); // clear the form fields
        setIsAdding(false);
      } else {
        console.error(
          "Failed to add employee:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during employee addition:", error);
    }
  };

  const closeModal = () => setIsAdding(false);

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit(addEmployeeHandler)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-bold text-center text-slate-900">
            Add an employee
          </h2>
          {/* cancel btn */}
          <button
            type="button"
            className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={closeModal}
          >
            <IoCloseSharp />
          </button>
        </div>
        {/* input fields */}
        {/* firstname */}
        <label className="block text-sm font-medium ">
          First Name <span className="text-red-600">*</span>
          <input
            placeholder="Ibrahim"
            {...register("firstName")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        {/* lastname */}
        <label className="block text-sm font-medium ">
          Last Name <span className="text-red-600">*</span>
          <input
            placeholder="Saddik"
            {...register("lastName")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        {/* email */}
        <label className="block text-sm font-medium ">
          Email <span className="text-red-600">*</span>
          <input
            {...register("email")}
            type="email"
            placeholder="employeemail@cyberteq.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        {/* phoneNumber */}
        <label className="block text-sm font-medium ">
          Phone Number <span className="text-red-600">*</span>
          <input
            type="tel"
            {...register("phoneNumber")}
            placeholder="+233 50 369 9012"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        {/* role */}
        <label className="block text-sm font-medium ">
          Role <span className="text-red-600">*</span>
          <select
            {...register("role")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue="--Select role--"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name.toUpperCase()}
              </option>
            ))}

            {/* <option value="manager">Manager</option>
            <option value="employee">Employee</option> */}
          </select>
        </label>
        {/* departments */}
        <label className="block text-sm font-medium ">
          Department <span className="text-red-600">*</span>
          <select
            {...register("departmentId")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue="--Select Department--"
          >
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>

        {/* employee type*/}
        <label className="block text-sm font-medium ">
          Employment Type <span className="text-red-600">*</span>
          {loading ? (
            <div>loading...</div>
          ) : (
            <select
              {...register("employmentTypeId")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue="--Select Employment--"
            >
              {employmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          )}
        </label>

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
