import React, { useState } from "react";
import Modal from "../../_ui/Modal";
import { FaEye } from "react-icons/fa";
import { ChangeDate } from "../../../utils/utilityFunctions";
import ViewLeaveDetails from "./ViewLeaveDetails";
import { TableSkeleton } from "../../_ui/Skeletons";
import useLeavesData from "../../../hooks/useLeavesData";

export default function LeavesTable() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All");
  const { loadingLeavesData, leavesData, leavesDataError } = useLeavesData();

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
    <div className="w-full p-2 md:w-full overflow-x-auto">
      {/* Tabs for filtering leaves */}
      <div className="mb-4 w-full flex gap-2 flex-wrap border-b border-gray-700">
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
      {loadingLeavesData ? (
        // Show loader if data is loading
        <TableSkeleton />
      ) : loadingLeavesData ? (
        <div>Error loading leaves</div>
      ) : (
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
            <tr>
              <td>
                <hr style={{ border: "1px solid #E5E7EB", margin: "0" }} />
              </td>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {filterLeavesHandler()?.length > 0 ? (
              // Display leaves data if available
              filterLeavesHandler()?.map((item) => (
                // row
                <React.Fragment key={item.id}>
                  <tr className="bg-white hover:bg-gray-50 ">
                    <td className="py-3">{item.user.name}</td>
                    <td>{item.leaveType.name} Leave</td>
                    <td>{ChangeDate(item.startDate)}</td>
                    <td>{ChangeDate(item.endDate)}</td>
                    <td>{item.status}</td>
                    <td className="flex gap-2">
                      {/* <button
                        onClick={() => viewDetailsHandler(item.id)}
                        className="cursor-pointer py-1 px-2 border-2 hover:bg-gray-200 border-blue-300 rounded-md"
                      >
                        VIEW
                      </button> */}

                      <button
                        className="bg-transparent text-blue-700 rounded-sm py-2 px-4 border-2 border-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-primaryColor "
                        onClick={() => viewDetailsHandler(item.id)}
                      >
                        VIEW
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <hr
                        style={{
                          border: "1px solid #E5E7EB",
                          margin: "0",
                        }}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              // Display message if no leaves found
              <tr className="bg-white border-b text-lg hover:bg-gray-50 ">
                <td colSpan={6}>No leaves...</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* display leave details */}
      {selectedLeave && (
        <Modal closeModal={closeModal}>
          <ViewLeaveDetails selectedLeave={selectedLeave} />
        </Modal>
      )}
    </div>
  );
}
