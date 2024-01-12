import { useForm } from "react-hook-form";
import Modal from "../../_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { useLeaveContext } from "../../../contexts/LeaveContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Add({ appliedeaves, setAppliedLeaves }) {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { setIsAddingLeave, addLeaveHandler } = useLeaveContext();
  // function to show the reason textbox
  const [selectedLeaveType, setSelectedLeaveType] = useState("");

  const addNewLeave = (data) => {
    const { leaveType, startDate, endDate, reason } = data;

    if (!leaveType || !startDate || !endDate) {
      alert("Please fill out all the required fields.");
      return;
    }

    const updatedLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
      id: appliedeaves.length + 1,
    };

    // api call here
    setAppliedLeaves([updatedLeave, ...appliedeaves]);
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
        <label htmlFor="leaveType" className="block text-sm font-medium ">
          Leave type <span className="text-red-700">*</span>
        </label>
        <select
          {...register("leaveType")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) => setSelectedLeaveType(e.target.value)}
          // value={selectedLeaveType}
        >
          <option value="--Leave Type--" disabled hidden>
            --Leave Type--
          </option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Emergency Leave">Emergency Leave</option>
        </select>

        <label htmlFor="startDate" className="block text-sm font-medium ">
          Start date <span className="text-red-700">*</span>
        </label>
        <input
          type="date"
          {...register("startDate")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        <label htmlFor="endDate" className="block text-sm font-medium ">
          End date <span className="text-red-700">*</span>
        </label>
        <input
          type="date"
          {...register("endDate")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />

        {selectedLeaveType === "Emergency Leave" && (
          <>
            <label htmlFor="reason" className="block text-sm font-medium ">
              Reason
            </label>
            <textarea
              {...register("reason")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </>
        )}

        {/* add btn */}
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
