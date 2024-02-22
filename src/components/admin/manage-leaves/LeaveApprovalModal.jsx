import API from "../../../api/axios";
import { toast } from "react-toastify";

export default function LeaveApprovalModal({ approveModalHandler, leaveId }) {
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
      const response = await API.put(`/LeaveRequest/reject-request/${leaveId}`);
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
        className="cursor-pointer hover:bg-gray-400 w-full"
        onClick={approveLeaveHandler}
      >
        Approve
      </li>
      <li
        className="cursor-pointer hover:bg-gray-400 w-full"
        onClick={declineLeaveHandler}
      >
        Decline
      </li>
    </ul>
  );
}
