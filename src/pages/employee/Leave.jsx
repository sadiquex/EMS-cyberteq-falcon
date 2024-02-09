import { Link } from "react-router-dom";
import Card from "../../components/_ui/Card";
import { useLeaveContext } from "../../contexts/LeaveContext";
import Add from "../../components/employee/leaves/Add";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function Leave() {
  const { isAddingLeave, addLeaveHandler } = useLeaveContext();
  const [appliedLeaves, setAppliedLeaves] = useState(null);
  const [typesofLeave, setTypesofLeave] = useState(null);

  useEffect(() => {
    const getLeaveTypes = async () => {
      try {
        const response = await API.get(`/LeaveType`);
        setTypesofLeave(response.data.result);
      } catch (error) {
        // console.log(error);
        toast(error);
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
        <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900">
          {typesofLeave?.map((leave, i) => (
            <Link to={leave.route} key={i}>
              <Card cardType="">
                <p className="font-normal ">{leave.name} Leave</p>
                <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
                  {leave.allocatedDays} / {leave.allocatedDays}
                </h5>
              </Card>
            </Link>
          ))}
        </div>
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
