import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../../../api/axios";
import Modal from "../../_ui/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

export default function LeaveApprovalModal({ approveModalHandler, leaveId }) {
  const [declineReason, setDeclineReason] = useState("");
  // state to control the visibility of decline reason field
  const [showDeclineReason, setShowDeclineReason] = useState(false);

  const handleReasonModal = () => setShowDeclineReason(!showDeclineReason);

  // accept leave request
  const approveLeaveHandler = async () => {
    try {
      const response = await API.put(`/LeaveRequest/accept-request/${leaveId}`);
      if (response.status === 200) {
        toast.success("Leave approved successfully");
        approveModalHandler();
      }
    } catch (error) {
      toast.error("Can't change leave status");
      approveModalHandler();
    }
  };

  // reject leave request
  const declineLeaveHandler = async () => {
    try {
      const response = await API.put(
        `/LeaveRequest/reject-request/${leaveId}`,
        {
          reason: declineReason, // Pass the decline reason to the API
        }
      );
      if (response.status === 200) {
        toast.success("Leave request declined");
        approveModalHandler();
      }
    } catch (error) {
      toast.error("Can't change leave status");
      approveModalHandler();
    }
  };

  return (
    <ul className="absolute right-[11%] py-4 text-sm w-44 flex flex-col items-center justify-center gap-3 bg-gray-100 rounded-md shadow">
      <li
        className="cursor-pointer bg-green-700 hover:bg-green-800 text-primaryColor rounded-md p-2.5 w-full flex items-center gap-2 justify-center"
        onClick={approveLeaveHandler}
      >
        <FaCheckCircle size={20} />
        Approve
      </li>
      <li className="w-full flex flex-col items-center gap-2">
        <button
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-primaryColor rounded-md p-2.5 w-full flex items-center gap-2 justify-center"
          onClick={handleReasonModal}
        >
          <FaTimes size={20} />
          Decline
        </button>
      </li>

      <li className="w-full flex flex-col items-center gap-2">
        <button
          className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-primaryColor rounded-md p-2.5 w-full flex items-center gap-2 justify-center"
          onClick={() => approveModalHandler()}
        >
          <TiCancel size={20} />
          Cancel
        </button>
      </li>

      {showDeclineReason && (
        // decline leave modal
        <Modal closeModal={handleReasonModal}>
          <div className="h-[60%]">
            <textarea
              type="text"
              placeholder="Reason for decline"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="text-secondaryColor bg-gray-100 rounded-md p-2.5 w-full h-full"
            />
          </div>
          <div className="flex w-full gap-2 pt-4">
            <button
              className="flex-1 bg-red-700 hover:bg-red-600 text-white rounded-md p-2.5"
              onClick={declineLeaveHandler}
            >
              Confirm Decline
            </button>
            <button
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md p-2.5"
              onClick={handleReasonModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </ul>
  );
}
