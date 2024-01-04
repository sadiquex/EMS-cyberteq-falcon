import { leavesData } from "../../../data";
import { useState } from "react";
import Modal from "../../_ui/Modal";
import { IoCloseSharp } from "react-icons/io5";

export default function LeavesTable() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All");

  const viewDetailsHandler = (id) => {
    const leave = leavesData.find((l) => l.id === id);
    setSelectedLeave(leave);
  };

  const closeDetailsHandler = () => {
    setSelectedLeave(null);
  };

  const filterLeavesHandler = () => {
    if (selectedTab === "All") {
      return leavesData;
    } else {
      return leavesData.filter((item) => item.status === selectedTab);
    }
  };

  const filterButtons = ["All", "Approved", "Pending", "Declined"];

  return (
    <>
      {/* Tabs for filtering leaves */}
      <div className="mb-4 w-1/2 flex justify-between border-b border-gray-700">
        {filterButtons.map((button, i) => (
          <button
            key={i}
            onClick={() => setSelectedTab(button)}
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              selectedTab === button ? "border-b-4 border-blue-600" : ""
            }`}
          >
            {button}
          </button>
        ))}
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-50 "
                onClick={() => viewDetailsHandler(item.id)}
              >
                <td className="py-3">{item.employeeName}</td>
                <td>{item.leaveType}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.status}</td>
                <td>
                  <span>edit</span>
                  <span className="text-red-500">delete</span>
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
        <Modal>
          <div className="flex justify-between items-center">
            <h2 className="text-[30px] font-bold text-center text-slate-900">
              Leave Details
            </h2>
            {/* cancel btn */}
            <button
              type="button"
              className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={closeDetailsHandler}
            >
              <IoCloseSharp />
            </button>
          </div>

          <p>Employee Name: {selectedLeave.employeeName}</p>
          <p>Leave Type: {selectedLeave.leaveType}</p>
          <p>Start Date: {selectedLeave.startDate}</p>
          <p>End Date: {selectedLeave.endDate}</p>
          <p>Status: {selectedLeave.status}</p>
        </Modal>
      )}
    </>
  );
}
