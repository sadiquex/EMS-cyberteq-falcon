import { useForm } from "react-hook-form";
import Modal from "../../_ui/Modal";
import { useLeaveContext } from "../../../contexts/LeaveContext";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "../../_ui/Spinner";
import useUserData from "../../../hooks/useUserData";
import Button from "./../../_ui/Button.jsx";
import { QueryClient } from "@tanstack/react-query";
export default function Add() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { setIsAddingLeave, addLeaveHandler } = useLeaveContext();
  const { id, userName, departmentId, role } = useSelector(
    (state) => state.user?.userDetails
  );
  const { userDataLoading, userDataError, userData } = useUserData(id);

  // to route correctly after applying for leave
  const adjustedRole = role === "user" ? "employee" : role;

  const [purpose, setPurpose] = useState("");

  // collect leave request data for api
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
        queryClient.invalidateQueries({ queryKey: ["leavesData"] });
        reset();
        setIsAddingLeave(false);

        // go to leave status after successful request
        navigate(`/${adjustedRole}/leave-status`);
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

  // validation to ensure end date is not earlier than start date
  const onSubmitLeave = (data) => {
    const { startDate, endDate } = data;
    if (new Date(endDate) < new Date(startDate)) {
      // If end date is earlier than start date, set an error
      return toast.error("End date cannot be earlier than Start date");
    }
    // pass the data to the addNewLeave function
    addNewLeave(data);
  };

  return (
    <Modal closeModal={addLeaveHandler}>
      {userDataLoading ? (
        <Spinner />
      ) : userDataError ? (
        <div>Error: {userDataError.message}</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitLeave)} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[30px] font-bold text-center text-slate-900">
              Request Leave Form
            </h2>
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

          <Button type="submit">Send Request</Button>

          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-primaryColor rounded-sm ml-4 p-4 min-w-[140px]"
            onClick={addLeaveHandler}
          >
            Cancel
          </button>
        </form>
      )}
    </Modal>
  );
}
