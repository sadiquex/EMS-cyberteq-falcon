import { useEffect, useState } from "react";
import Add from "../../components/employee/leaves/Add";
import { useLeaveContext } from "../../contexts/LeaveContext";
import Modal from "../../components/_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import API from "../../api/axios";

export default function LeaveStatusTable() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const { isAddingLeave, addLeaveHandler } = useLeaveContext();
  const [appliedLeaves, setAppliedLeaves] = useState(null);

  useEffect(() => {
    const getAppliedLeaves = async () => {
      try {
        const response = await API.get(`/LeaveRequest`);
        setAppliedLeaves(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getAppliedLeaves();
  }, []);

  // view details
  const viewDetailsHandler = (id) => {
    const leave = appliedLeaves?.find((leave) => leave.id === id);
    setSelectedLeave(leave);
  };

  const closeModal = () => setSelectedLeave(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2>Leave Dashboard</h2>
        <button
          className="bg-secondaryColor text-primaryColor rounded-lg md:rounded-full p-2 md:p-4 hover:brightness-110"
          onClick={addLeaveHandler}
        >
          + Request For Leave
        </button>
      </div>

      {/* table for displaying leaves statuses */}
      <div className="w-[350px] md:w-full overflow-x-auto bg-red-500 p-[1px]">
        <table className="text-sm w-full text-left rtl:text-right whitespace-nowrap">
          {/* head */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="text-[16px]">
              <th className="py-3">Leave Type</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {appliedLeaves?.length > 0 ? (
              appliedLeaves?.map((leave, i) => (
                // row
                <tr
                  key={i}
                  className="bg-white hover:bg-gray-50 cursor-pointer"
                  onClick={() => viewDetailsHandler(leave.id)}
                >
                  {/* <td className="py-4">{leave.leaveType}</td> */}
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.duration}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span
                      className={`text-white p-2 rounded-lg ${
                        leave.status === "Pending"
                          ? "bg-yellow-500"
                          : leave.status === "Approved"
                          ? "bg-green-500"
                          : leave.status === "Declined"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {/* if leave status is null, set it to Pending by default */}
                      {leave.status === null ? "Pending" : leave.status}
                    </span>
                    {leave.status === "Pending" && (
                      <button
                        className="ml-2 text-md p-2 rounded-lg bg-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Please confirm to deleve leave");
                        }}
                      >
                        <MdDelete />
                        {/* Delete */}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                {/* display a loader */}
                <td colSpan={7}>You haven't applied for any leave...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedLeave && (
        <Modal closeModal={closeModal}>
          <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-[30px] font-bold text-center text-slate-900">
                Leave details
              </h2>
              {/* cancel btn */}
              <button
                type="button"
                className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={closeModal}
              >
                <IoCloseSharp />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              {/* <p>Leave type: {selectedLeave.leaveType}</p> */}
              <p>Start date: {selectedLeave.startDate}</p>
              <p>Duration: {selectedLeave.duration}</p>
              <p>End date: {selectedLeave.endDate}</p>
              <p>Reason: {selectedLeave.reason}</p>
              <p>Status: {selectedLeave.status}</p>
            </div>
          </div>
        </Modal>
      )}

      {/* adding leave */}
      {isAddingLeave && (
        <Add
          appliedLeaves={appliedLeaves}
          setAppliedLeaves={setAppliedLeaves}
        />
      )}
    </div>
  );
}
