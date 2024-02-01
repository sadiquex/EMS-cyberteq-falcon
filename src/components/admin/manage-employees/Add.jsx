import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../../redux/features/admin-slices/adminEmployeesSlice";
import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { toast } from "react-toastify";

export default function Add({ setIsAdding }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // GET - departments, roles and employment types
  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();

      try {
        const [employmentTypesResponse, departmentsResponse, rolesResponse] =
          await Promise.all([
            API.get("/EmploymentType", { signal: controller.signal }),
            API.get("/Department", { signal: controller.signal }),
            API.get("/Role", { signal: controller.signal }),
          ]);

        if (!controller.signal.aborted) {
          setEmploymentTypes(employmentTypesResponse.data.result);
          setDepartments(departmentsResponse.data.result);
          setRoles(rolesResponse.data.result);
          setLoading(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function
    // Cancel requests when the component unmounts
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

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
      setLoading(true);

      const response = await API.post("/Users/register-user", newEmployee, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("successfully added", response.data);
        toast.success("successfully added");

        dispatch(addEmployee(newEmployee));
        reset(); // clear the form fields
        setLoading(false);
        setIsAdding(false);
      } else if (response.status === 500) {
        toast.error("Internal server error " + response.status);
      } else {
        console.error(
          "Failed to add employee:",
          response.status,
          response.statusText
        );
        toast.error("Failed to add employee");
        setLoading(false);
      }
    } catch (error) {
      // console.error("error adding employee: ", error);
      toast.error("error adding employee ", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsAdding(false);

  return (
    <Modal closeModal={closeModal}>
      {loading && (
        <div className="text-center text-primaryColor font-bold mb-4">
          Loading...
        </div>
      )}

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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
        </label>
        {/* lastname */}
        <label className="block text-sm font-medium ">
          Last Name <span className="text-red-600">*</span>
          <input
            placeholder="Saddik"
            {...register("lastName")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
        </label>
        {/* email */}
        <label className="block text-sm font-medium ">
          Email <span className="text-red-600">*</span>
          <input
            {...register("email")}
            type="email"
            placeholder="employeemail@cyberteq.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
        </label>
        {/* phoneNumber */}
        <label className="block text-sm font-medium ">
          Phone Number <span className="text-red-600">*</span>
          <input
            type="tel"
            {...register("phoneNumber")}
            placeholder="+233 50 369 9012"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
        </label>
        {/* role */}
        <label className="block text-sm font-medium ">
          Role <span className="text-red-600">*</span>
          <select
            {...register("role")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            defaultValue="--Select role--"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        {/* departments */}
        <label className="block text-sm font-medium ">
          Department <span className="text-red-600">*</span>
          <select
            {...register("departmentId")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
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
          className="bg-secondaryColor text-primaryColor rounded-full p-4 hover:brightness-110 min-w-[140px]"
          type="submit"
        >
          Add
        </button>
      </form>
    </Modal>
  );
}
