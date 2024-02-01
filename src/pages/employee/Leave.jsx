import { Link } from "react-router-dom";
import Card from "../../components/_ui/Card";
import { useLeaveContext } from "../../contexts/LeaveContext";
import Add from "../../components/employee/leaves/Add";

export default function Leave() {
  const { isAddingLeave, addLeaveHandler, appliedeaves, setAppliedLeaves } =
    useLeaveContext();

  const typesOfLeave = [
    {
      name: "Annual Leave",
      remaining: 18,
      used: 4,
      total: 20,
    },
    {
      name: "Emergency Leave",
      remaining: 18,
      used: 4,
      total: 20,
    },
    {
      name: "Sick Leave",
      remaining: 18,
      used: 4,
      total: 20,
    },
    {
      name: "Maternity Leave",
      remaining: 18,
      used: 4,
      total: 20,
    },
  ];

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
          {typesOfLeave.map((leave, i) => (
            <Link to={leave.route} key={i}>
              <Card cardType="">
                <p className="font-normal ">{leave.name}</p>
                <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
                  {leave.remaining} / {leave.total}
                </h5>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* adding leave */}
      {isAddingLeave && (
        <Add appliedeaves={appliedeaves} setAppliedLeaves={setAppliedLeaves} />
      )}
    </div>
  );
}
