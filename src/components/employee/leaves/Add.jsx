import { useForm } from "react-hook-form";
import Modal from "../../_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { useLeaveContext } from "../../../contexts/LeaveContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../../api/axios";

export default function Add({ appliedLeaves, setAppliedLeaves }) {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { setIsAddingLeave, addLeaveHandler } = useLeaveContext();

  const addNewLeave = async (data) => {
    console.log(data);
    const response = await API.post(`/LeaveRequest`, data);
    setAppliedLeaves([response.data.result, ...appliedLeaves]);

    reset();
    setIsAddingLeave(false);
    navigate("/employee/leave-status");
  };

  return (
    <Modal closeModal={addLeaveHandler}>
      <form onSubmit={handleSubmit(addNewLeave)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-bold text-center text-slate-900">
            Request Leave Form
          </h2>
          {/* cancel btn */}
          <button
            type="button"
            className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={addLeaveHandler}
          >
            <IoCloseSharp />
          </button>
        </div>
        {/* input fields */}
        {/* leave type */}
        <label className="block text-sm font-medium ">
          Leave type <span className="text-red-700">*</span>
          <select
            {...register("leaveTypeId")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="--Leave Type--" disabled hidden>
              --Leave Type--
            </option>
            <option value="MAT">Maternity Leave</option>
            <option value="ANNU">Annual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="EMRG">Emergency Leave</option>
          </select>
        </label>
        <label className="block text-sm font-medium ">
          Start date <span className="text-red-700">*</span>
          <input
            type="date"
            {...register("startDate")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        <label className="block text-sm font-medium ">
          End date <span className="text-red-700">*</span>
          <input
            type="date"
            {...register("endDate")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        {/* cover */}
        <label className="block text-sm font-medium ">
          Cover (who does your work in your absence)
          <input
            {...register("cover")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </label>
        {/* purpose */}
        <label className="block text-sm font-medium ">
          Purpose
          <textarea
            {...register("purpose")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            // disabled
          />
        </label>
        {/* add btn */}
        <button
          className="bg-secondaryColor text-primaryColor rounded-full p-4 hover:brightness-110 min-w-[140px]"
          type="submit"
        >
          Send Request
        </button>
      </form>
    </Modal>
  );
}
