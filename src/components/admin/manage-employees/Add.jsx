import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";
import { useState } from "react";
import API from "../../../api/axios";
import { toast } from "react-toastify";
import { Spinner } from "../../_ui/Spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../_ui/Button";

export default function Add({ setIsAdding }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  // GET - departments, roles and employment types
  const { data: employmentTypes, isLoading: employmentTypesLoading } = useQuery(
    {
      queryKey: "/EmploymentType",
      queryFn: async () => {
        const response = await API.get("/EmploymentType");
        return response.data.result;
      },
    }
  );

  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryKey: "/Department",
    queryFn: async () => {
      const response = await API.get("/Department");
      return response.data.result;
    },
  });

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: "/Role",
    queryFn: async () => {
      const response = await API.get("/Role");
      return response.data.result;
    },
  });

  const closeModal = () => setIsAdding(false);

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

      const response = await API.post("/Users/register-user", newEmployee);
      console.log(response);
      if (response.data) {
        toast.success("Employee successfully added");
        // invalidate query to refetch employees
        queryClient.invalidateQueries("employees");

        reset(); // clear the form fields
        setLoading(false);
        setIsAdding(false);
      }
    } catch (error) {
      toast.error(error.response.data.errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      {loading && <Spinner />}

      <form onSubmit={handleSubmit(addEmployeeHandler)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-center text-slate-900">
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
            placeholder="Jason"
            {...register("firstName", { required: "Enter the First Name" })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </label>

        {/* lastname */}
        <label className="block text-sm font-medium ">
          Last Name <span className="text-red-600">*</span>
          <input
            placeholder="Statham"
            {...register("lastName", {
              required: "Enter the employee's last name",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </label>

        {/* email */}
        <label className="block text-sm font-medium">
          Email <span className="text-red-600">*</span>
          <input
            {...register("email", {
              required: "Email field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="jasonstatham@falcontech.com"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </label>

        {/* phoneNumber */}
        <label className="block text-sm font-medium ">
          Phone Number <span className="text-red-600">*</span>
          <input
            type="number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            })}
            placeholder="0503699012"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </label>
        {/* role */}
        <label className="block text-sm font-medium ">
          Role <span className="text-red-600">*</span>
          {rolesLoading ? (
            <Spinner />
          ) : (
            <select
              {...register("role")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              defaultValue="--Select role--"
            >
              {roles?.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                </option>
              ))}
            </select>
          )}
        </label>
        {/* departments */}
        <label className="block text-sm font-medium ">
          Department <span className="text-red-600">*</span>
          {departmentsLoading ? (
            <Spinner />
          ) : (
            <select
              {...register("departmentId")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              defaultValue="--Select Department--"
            >
              {departments?.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          )}
        </label>

        {/* employee type*/}
        <label className="block text-sm font-medium ">
          Employment Type <span className="text-red-600">*</span>
          {
            <select
              {...register("employmentTypeId")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              defaultValue="--Select Employment--"
            >
              {employmentTypesLoading ? (
                <Spinner />
              ) : (
                employmentTypes?.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
          }
        </label>

        <div className="w-full flex justify-end gap-2">
          <div className="">
            {loading ? (
              <Spinner />
            ) : (
              <Button>
                <button type="submit">Add</button>
              </Button>
            )}
          </div>
          <button
            onClick={closeModal}
            className="cursor-pointer w-[140px] bg-secondaryColor hover:bg-primaryColor hover:text-secondaryColor text-primaryColor rounded-sm p-4 flex items-center gap-2 justify-center border-2 border-secondaryColor"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
