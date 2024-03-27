import { Link } from "react-router-dom";
import Card from "../../components/_ui/Card";
import { useLeaveContext } from "../../contexts/LeaveContext";
import Add from "../../components/employee/leaves/Add";
import { useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { CardSkeleton } from "../../components/_ui/Skeletons";
import LeavesChart from "../../components/employee/leaves/LeavesChart";
import LeaveStatusTable from "./LeaveStatusTable";
import Button from "../../components/_ui/Button";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useLeavesData from "../../hooks/useLeavesData";

export default function Leave() {
  const { isAddingLeave, addLeaveHandler } = useLeaveContext();
  const { id } = useSelector((state) => state.user?.userDetails);
  const { loadingLeavesData, leavesData, leavesDataError, refetchLeavesData } =
    useLeavesData();

  // react query
  const {
    isLoading: loadingtypesofLeave,
    isError: typesofLeaveError,
    data: typesofLeave,
    refetch,
  } = useQuery({
    queryKey: ["typesofLeave"],
    queryFn: async () => {
      try {
        const response = await API.get(`/LeaveType`);

        if (response.status === 200) {
          return response.data.result;
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error.message + " getting leave types");
      }
    },
  });

  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2>Leave Dashboard</h2>
          <Button onClick={addLeaveHandler}>+ Request For Leave</Button>
        </div>

        {/* display leave types */}
        {loadingtypesofLeave ? (
          <CardSkeleton />
        ) : (
          // <div className=" md:max-w-[1100px] grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-900">
          <div className="w-full flex justify-between flex-wrap gap-4">
            {typesofLeave?.map((leave, i) => (
              <Link to={leave.route} key={i}>
                <Card cardType="">
                  <p className="font-normal ">{leave.name} Leave</p>
                  {/* <LeavesChart leave={leave} /> */}
                  <h5 className="mb-2 text-3xl font-bold ">
                    {leave.allocatedDays} / {leave.allocatedDays}
                  </h5>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* render leaves status table */}
      <div className="pt-6">
        <LeaveStatusTable />
      </div>

      {/* adding leave */}
      {isAddingLeave && <Add />}
    </div>
  );
}
