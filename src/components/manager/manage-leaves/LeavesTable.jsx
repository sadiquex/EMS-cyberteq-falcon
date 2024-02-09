import { useEffect, useState } from "react";
import Modal from "../../_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import LeaveApprovalModal from "./LeaveApprovalModal";
import API from "../../../api/axios";
import { ChangeDate } from "../../../utils/utilityFunctions";
import { toast } from "react-toastify";
import ViewLeaveDetails from "./ViewLeaveDetails";

export default function LeavesTable() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [leavesData, setLeavesData] = useState([]);

  useEffect(() => {
    const getLeavesData = async () => {
      try {
        const response = await API.get(`/LeaveRequest`);

        if (response.status === 200) {
          setLeavesData(response.data.result);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    getLeavesData();
  }, []);

  const approveModalHandler = (id) => {
    setIsApproving(!isApproving);
    setSelectedItemId(id); // Set the selectedItemId when the button is clicked
  };

  const viewDetailsHandler = (id) => {
    const leave = leavesData?.find((l) => l.id === id);
    setSelectedLeave(leave);
  };

  const closeModal = () => setSelectedLeave(null);

  const filterLeavesHandler = () => {
    if (selectedTab === "All") {
      return leavesData;
    } else {
      return leavesData?.filter((item) => item.status === selectedTab);
    }
  };

  return (
    <div className="w-[350px] md:w-full overflow-x-auto ">
      {/* Tabs for filtering leaves */}
      <div className="mb-4 w-auto space-x-4 border-b border-gray-700">
        {["All", "Accepted", "Pending", "Rejected"].map((button, i) => (
          <button
            key={i}
            onClick={() => setSelectedTab(button)}
            className={`p-4 border-b-2 hover:bg-gray-100 ${
              selectedTab === button
                ? // active style
                  "bg-secondaryColor text-white hover:bg-secondaryColor hover:text-white"
                : ""
            }`}
          >
            {button}
          </button>
        ))}
      </div>

      <table className="w-full text-sm text-left rtl:text-right whitespace-nowrap">
        {/* head */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr className="text-[16px]">
            <th className="py-3">Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* body */}
        <tbody>
          {filterLeavesHandler()?.length > 0 ? (
            filterLeavesHandler()?.map((item) => (
              // row
              <tr key={item.id} className="bg-white hover:bg-gray-50 ">
                <td className="py-3">{item.user.name}</td>
                <td>{item.leaveType.name} Leave</td>
                <td>{ChangeDate(item.startDate)}</td>
                <td>{ChangeDate(item.endDate)}</td>
                <td>{item.status}</td>
                <td className="flex gap-2">
                  <BsThreeDotsVertical
                    className="cursor-pointer"
                    size={18}
                    onClick={() => approveModalHandler(item.id)}
                  />
                  {/* approval modal */}
                  {isApproving && selectedItemId === item.id && (
                    <LeaveApprovalModal
                      approveModalHandler={approveModalHandler}
                      leaveId={item.id}
                    />
                  )}
                  <FaEye
                    size={18}
                    onClick={() => viewDetailsHandler(item.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b  hover:bg-gray-50 ">
              {/* display a loader */}
              <td colSpan={7}>No leaves...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* display leave details */}
      {selectedLeave && (
        <Modal closeModal={closeModal}>
          <ViewLeaveDetails selectedLeave={selectedLeave} />
        </Modal>
      )}
    </div>
  );
}
