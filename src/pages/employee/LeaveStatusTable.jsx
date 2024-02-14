import { useEffect, useState } from "react";
import Add from "../../components/employee/leaves/Add";
import Modal from "../../components/_ui/Modal";
import { Spinner } from "../../components/_ui/Spinner";
import { useLeaveContext } from "../../contexts/LeaveContext";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import API from "../../api/axios";
import ViewLeaveDetails from "../../components/employee/leaves/ViewLeaveDetails";
import {
  ChangeDate,
  calculateLeaveDuration,
} from "../../utils/utilityFunctions";
import { updateLeaves } from "../../redux/features/employee-slices/LeaveSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LeaveStatusTable() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const { isAddingLeave, addLeaveHandler } = useLeaveContext();
  const [appliedLeaves, setAppliedLeaves] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppliedLeaves = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/LeaveRequest`);
        if (response.status === 200) {
          setAppliedLeaves(response.data.result);
          // store the leaves in state
          dispatch(updateLeaves(response.data.result));
          setLoading(false);
        } else if (response.status === 500) {
          setLoading(false);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAppliedLeaves();
  }, []);

  // view details
  // const viewDetailsHandler = (id) => {
  //   const leave = appliedLeaves?.find((leave) => leave.id === id);
  //   setSelectedLeave(leave);
  // };

  // VIEW details
  const viewDetailsHandler = async (id) => {
    // setLoading(true);
    try {
      const response = await API.get(`/LeaveRequest/${id}`);
      if (response.status === 200) {
        toast.success(response.data.result);
        setSelectedLeave(response.data.result);
      }
    } catch (error) {
      toast.error(error.response.data.errorMessages);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // delete leave
  const deleteLeaveHandler = async (leaveId) => {
    try {
      const response = await API.delete(`/LeaveRequest/${leaveId}`);
      if (response.status === 200) {
        // console.log(response);
        toast.success("Leave deleted");
        setAppliedLeaves(
          appliedLeaves?.filter((leave) => leave.id !== leaveId)
        );
      }
    } catch (error) {
      console.log(error);
    }
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
        {loading && <Spinner />}

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
            {/* Check if there are applied leaves */}
            {appliedLeaves?.length > 0 ? (
              // If there are applied leaves, map and display them
              appliedLeaves?.map((leave, i) => (
                // row
                <tr
                  key={i}
                  className="bg-white hover:bg-gray-50 cursor-pointer"
                  onClick={() => viewDetailsHandler(leave.id)}
                >
                  <td className="py-4">
                    {leave.leaveType?.name || "Unknown"} Leave
                  </td>
                  <td>{ChangeDate(leave.startDate)}</td>
                  <td>{ChangeDate(leave.endDate)}</td>
                  <td>
                    {calculateLeaveDuration(leave.startDate, leave.endDate)}
                  </td>
                  <td>{leave.purpose}</td>
                  <td>
                    {leave.status}
                    {leave.status === "Pending" && (
                      <button
                        className="ml-2 text-md p-2 rounded-lg bg-red-400"
                        onClick={(e) => {
                          alert("Please confirm to delete leave");
                          e.stopPropagation();
                          deleteLeaveHandler(leave.id);
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
                <td colSpan={6} className="py-4">
                  {appliedLeaves?.length === 0 ? (
                    "You haven't applied for any leave..."
                  ) : (
                    <Spinner />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedLeave && (
        <Modal closeModal={closeModal}>
          <ViewLeaveDetails
            selectedLeave={selectedLeave}
            closeModal={closeModal}
          />
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
