import { useForm } from "react-hook-form";
import Modal from "../../_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { useLeaveContext } from "../../../contexts/LeaveContext";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

export default function Add() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { setIsAddingLeave, addLeaveHandler } = useLeaveContext();
  const { id, userName, departmentId } = useSelector(
    (state) => state.user?.userDetails
  );
  const [purpose, setPurpose] = useState("");

  // Use the correct syntax for useQuery
  const {
    isLoading,
    error,
    data: userData,
  } = useQuery({
    queryKey: ["userData", id],
    queryFn: async () => {
      const response = await API.get(`/Users/user-profile/${id}`);
      return response.data?.result;
    },
  });

  console.log("query user: " + JSON.stringify(userData));

  const addNewLeave = async (data) => {
    try {
      const requestData = {
        ...data,
        userName: userName,
        departmentId: departmentId,
        purpose: purpose,
      };

      const response = await API.post(`/LeaveRequest`, requestData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Leave request successful");
        reset();
        setIsAddingLeave(false);
        navigate("/employee/leave-status");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errorMessages);
    }
  };

  useEffect(() => {
    // Update purpose state based on the selected leave type
    const leaveType = watch("leaveTypeId");
    if (leaveType === "MAT" || leaveType === "ANNU" || leaveType === "SICK") {
      setPurpose(
        `${
          leaveType === "MAT"
            ? "Maternity"
            : leaveType === "ANNU"
            ? "Annual"
            : "Sick"
        } Leave`
      );
    } else {
      setPurpose("");
    }
  }, [watch("leaveTypeId")]);

  return (
    <Modal closeModal={addLeaveHandler}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <form onSubmit={handleSubmit(addNewLeave)} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[30px] font-bold text-center text-slate-900">
              Request Leave Form
            </h2>
            <button
              type="button"
              className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={addLeaveHandler}
            >
              <IoCloseSharp />
            </button>
          </div>
          <label className="block text-sm font-medium ">
            Leave type <span className="text-red-700">*</span>
            <select
              {...register("leaveTypeId", {
                required: "Leave type is required",
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.leaveTypeId && "border-red-500"
              }`}
              defaultValue="--Leave Type--"
            >
              <option value="--Leave Type--" disabled hidden>
                --Leave Type--
              </option>
              <option value="MAT">Maternity Leave</option>
              <option value="ANNU">Annual Leave</option>
              <option value="SICK">Sick Leave</option>
              <option value="EMRG">Emergency Leave</option>
            </select>
            {errors.leaveTypeId && (
              <p className="text-red-500 text-sm">
                {errors.leaveTypeId.message}
              </p>
            )}
          </label>
          <label className="block text-sm font-medium ">
            Start date <span className="text-red-700">*</span>
            <input
              type="date"
              {...register("startDate", { required: "Enter the Start Date" })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.startDate && "border-red-500"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </label>
          <label className="block text-sm font-medium ">
            End date <span className="text-red-700">*</span>
            <input
              type="date"
              {...register("endDate", { required: "Enter the End Date" })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.endDate && "border-red-500"
              }`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </label>

          {/* cover */}
          <label className="block text-sm font-medium ">
            Cover <span className="text-red-700">*</span>
            <input
              {...register("cover", { required: "Cover is required" })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.cover && "border-red-500"
              }`}
              placeholder="Who does your work in your absence"
            />
            {errors.cover && (
              <p className="text-red-500 text-sm">{errors.cover.message}</p>
            )}
          </label>
          {/* purpose */}
          {watch("leaveTypeId") === "EMRG" && (
            <label className="block text-sm font-medium ">
              Purpose <span className="text-red-700">*</span>
              <textarea
                {...register("purpose", { required: "Purpose is required" })}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.purpose && "border-red-500"
                }`}
                placeholder="Enter the reason for your leave"
              />
              {errors.purpose && (
                <p className="text-red-500 text-sm">{errors.purpose.message}</p>
              )}
            </label>
          )}

          {/* Add button */}
          <button
            className="bg-secondaryColor text-primaryColor rounded-full p-4 hover:brightness-110 min-w-[140px]"
            type="submit"
          >
            Send Request
          </button>
        </form>
      )}
    </Modal>
  );
}
