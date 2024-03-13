import React, { useState } from "react";
import API from "../../../api/axios";
import { toast } from "react-toastify";

export default function LeaveApprovalModal({ approveModalHandler, leaveId }) {
  const [declineReason, setDeclineReason] = useState("");
  // state to control the visibility of decline reason field
  const [showDeclineReason, setShowDeclineReason] = useState(false);

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
    <ul className="absolute right-[12%] py-4 text-sm w-44 flex flex-col items-center justify-center gap-3 bg-gray-700 divide-y text-white divide-gray-100 rounded-md shadow text-center">
      <li
        // className="cursor-pointer hover:bg-gray-400 w-full"
        className="cursor-pointer hover:bg-gray-400 text-white rounded-md p-2.5 w-full"
        onClick={approveLeaveHandler}
      >
        Approve
      </li>
      <li className="w-full flex flex-col items-center gap-2">
        {showDeclineReason && (
          <textarea
            type="text"
            placeholder="Reason for decline"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            className="bg-gray-800 text-white rounded-md p-2.5 w-full"
          />
        )}
        <button
          className="bg-red-600 hover:bg-red-700 text-white rounded-md p-2.5 w-full"
          onClick={() => {
            setShowDeclineReason(true);
          }}
        >
          Decline
        </button>
        {showDeclineReason && (
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-md p-2.5 w-full"
            onClick={declineLeaveHandler}
          >
            Confirm Decline
          </button>
        )}
      </li>
    </ul>
  );
}
