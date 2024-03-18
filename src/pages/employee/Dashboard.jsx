import Card from "../../components/_ui/Card";
import { MdOutlineTimeToLeave } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { todayDate } from "../../utils/utilityFunctions";
import SlidingImage from "../../components/_ui/SlidingImage";
import Portals from "../../components/Portals";
import { FaCalendarAlt } from "react-icons/fa";

export default function Dashboard() {
  const userToken = localStorage.getItem("userToken");
  const { profileCompleted, name } = useSelector(
    (state) => state.user?.userDetails
  );

  // check and remind user to complete their profile
  useEffect(() => {
    if (profileCompleted !== "True") {
      toast.warning("Please complete your profile");
    }
  }, [userToken]);

  return (
    <div className="space-y-4">
      <h2 className="">Dashboard</h2>

      {/* user profile card */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 md:max-w-[1000px] flex flex-col md:flex-row justify-between w-full gap-2 bg-gray-100 p-3">
          <p className="text-lg font-semibold">Welcome, {name}</p>
          <p className="text-lg flex items-center gap-2">
            <FaCalendarAlt size={20} />
            {todayDate}
          </p>
        </div>
      </div>
      {/* display portals */}
      <Portals />

      {/* 1st grid layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-secondaryColor">
        {/* left side */}
        {/* image */}
        <div className="w-full col-span-2 rounded-lg flex items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:h-[300px] overflow-hidden">
          {/* image slider here */}
          <SlidingImage />
        </div>

        {/* right side */}
        <div className="space-y-6">
          <Card cardType="displayCard">
            <div className="flex justify-between w-full">
              {/* left */}
              <span className="text-center">
                <p className="text-lg">5</p>
                <p className="font-semibold text-sm">LEAVE TAKEN</p>
              </span>

              {/* line */}
              <div className="border-l border-gray-500 h-full mx-4"></div>

              {/* right */}
              <span className="text-center">
                <p className="text-lg">12</p>
                <p className="font-semibold text-sm">REMAINING</p>
              </span>
            </div>
          </Card>

          <Card cardType="imageCard">
            <img
              src="https://cdn.educba.com/academy/wp-content/uploads/2019/01/Combination-Charts-Example-2-6.png"
              alt="chart"
              className="w-full overflow-hidden"
            />
          </Card>
        </div>
      </div>

      {/* 2nd grid layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 w-full text-secondaryColor flex items-center gap-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4">
          <MdOutlineTimeToLeave size={24} />
          <p>YOUR ANNUAL LEAVE STARTS TOMORROW</p>
        </div>
        <Card cardType="textCard" className="row-span-1">
          HOLIDAY - 6TH MARCH
        </Card>
      </div>
    </div>
  );
}
