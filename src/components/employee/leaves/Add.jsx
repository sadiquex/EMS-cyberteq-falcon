import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";

export default function Add({
  setIsAddingLeave,
  appliedeaves,
  setAppliedLeaves,
}) {
  const { register, handleSubmit, reset } = useForm();

  const [newLeave, setNewLeave] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    reason: "",
    id: appliedeaves.length + 1,
  });

  const addNewLeave = (data) => {
    const { leaveType, startDate, endDate, status, reason, id } = data;

    const updatedLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
      status,
      id,
    };

    setAppliedLeaves([updatedLeave, ...appliedeaves]);
    setNewLeave(updatedLeave);
    reset();
    setIsAddingLeave(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(addNewLeave)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[30px] font-bold text-center text-slate-900">
            Request Leave Form
          </h2>
          {/* cancel btn */}
          <button
            type="button"
            className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={() => setIsAddingLeave(false)}
          >
            <IoCloseSharp />
          </button>
        </div>
        {/* input fields */}
        <label htmlFor="leaveType" className="block text-sm font-medium ">
          Leave type
        </label>
        <input
          {...register("leaveType")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        <label htmlFor="startDate" className="block text-sm font-medium ">
          Start date
        </label>
        <input
          {...register("startDate")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        <label htmlFor="endDate" className="block text-sm font-medium ">
          End date
        </label>
        <input
          {...register("endDate")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        <label htmlFor="reason" className="block text-sm font-medium ">
          Reason
        </label>
        <input
          {...register("reason")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        <label htmlFor="status" className="block text-sm font-medium ">
          Status
        </label>
        <input
          {...register("status")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />

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
