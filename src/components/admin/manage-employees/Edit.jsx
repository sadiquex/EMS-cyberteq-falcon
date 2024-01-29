import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../_ui/Modal";
import Button from "../../_ui/Button";
import { useDispatch } from "react-redux";
import { editEmployee } from "../../../features/admin-slices/adminEmployeesSlice";
import { useForm } from "react-hook-form";

export default function Edit({ selectedEmployee, setIsEditing }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    const updatedEmployee = {
      id: selectedEmployee.id,
      updatedEmployeeData: data,
    };

    dispatch(editEmployee(updatedEmployee));
    setIsEditing(false);
  };

  const closeModal = () => setIsEditing(false);

  useEffect(() => {
    // Set initial values using setValue from react-hook-form
    setValue("name", selectedEmployee.name);
    setValue("email", selectedEmployee.email);
    setValue("phoneNumber", selectedEmployee.phoneNumber);
    setValue("role", selectedEmployee.role);
    setValue("department", selectedEmployee.department);
    setValue("employmentType", selectedEmployee.employmentType);
  }, [selectedEmployee, setValue]);

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <label className="block text-sm font-medium ">
          Name
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("name")}
          />
        </label>
        {/* email */}
        <label className="block text-sm font-medium ">
          Email
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("email")}
          />
        </label>

        {/* phoneNumber */}
        <label className="block text-sm font-medium ">
          Phone Number
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("phoneNumber")}
          />
        </label>

        {/* role */}
        <label className="block text-sm font-medium ">
          Role
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("role")}
          >
            <option value="" disabled hidden>
              --Select role--
            </option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </label>

        {/* department */}
        <label htmlFor="department" className="block text-sm font-medium ">
          Department
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          {...register("department")}
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
          {...register("employmentType")}
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
