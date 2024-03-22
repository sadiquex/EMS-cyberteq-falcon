import { FaCalendarAlt } from "react-icons/fa";
import { todayDate } from "../../utils/utilityFunctions";

export default function GreetingCard({ userData }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-2 bg-primaryColor p-4">
        <p className="text-lg font-semibold">Welcome, {userData?.name}</p>
        <p className="text-lg flex items-center gap-2">
          <FaCalendarAlt size={20} />
          {todayDate}
        </p>
      </div>
    </div>
  );
}
