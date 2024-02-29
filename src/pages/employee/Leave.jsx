import { Link } from "react-router-dom";
import Card from "../../components/_ui/Card";
import { useLeaveContext } from "../../contexts/LeaveContext";
import Add from "../../components/employee/leaves/Add";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { CardSkeleton } from "../../components/_ui/Skeletons";
import LeavesChart from "../../components/employee/leaves/LeavesChart";

export default function Leave() {
  const { isAddingLeave, addLeaveHandler } = useLeaveContext();
  const [appliedLeaves, setAppliedLeaves] = useState(null);
  const [typesofLeave, setTypesofLeave] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getLeaveTypes = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/LeaveType`);
        setTypesofLeave(response.data?.result);
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data?.errorMessages);
      } finally {
        setLoading(false);
      }
    };
    getLeaveTypes();
  }, []);

  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2>Leave Dashboard</h2>
          <button
            className="bg-secondaryColor text-primaryColor rounded-lg md:rounded-full p-2 md:p-4 hover:brightness-110"
            onClick={addLeaveHandler}
          >
            + Request For Leave
          </button>
        </div>

        {/* display leave types */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900">
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
