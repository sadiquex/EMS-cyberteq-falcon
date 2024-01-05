import Card from "../../components/_ui/Card";
import { FaBowlFood } from "react-icons/fa6";
import { GiVideoConference } from "react-icons/gi";
import { MdTimeToLeave } from "react-icons/md";
import { Routes, Route, Link } from "react-router-dom";

export default function Dashboard() {
  const portals = [
    {
      portalName: "Lunch Portal",
      portalIcon: <FaBowlFood />,
      route: "/employee/lunch",
    },
    {
      portalName: "Leave Portal",
      portalIcon: <MdTimeToLeave />,
      route: "/employee/leave",
    },
    {
      portalName: "Conference Room",
      portalIcon: <GiVideoConference size={24} />,
      route: "/employee/conference-room",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-large">Home Dashboard</h2>

      {/* user profile card */}
      <div className="flex gap-4">
        <div className="rounded-lg w-20 h-20 bg-red-400">
          <img src="" alt="Joseph Boyce" />
        </div>
        <div className="flex-1 flex flex-col bg-gray-200 p-3">
          <p className="text-lg font-bold">Welcome, Joseph Boyce</p>
          <p className="text-sm">Monday, 20th Feb 2024</p>
        </div>
      </div>

      {/* portals' display */}
      <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        {portals.map((portal, i) => (
          <Link to={portal.route} key={i}>
            <Card cardType="portal">
              <p className="font-normal ">{portal.portalName}</p>
              <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
                {portal.portalIcon}
              </h5>
            </Card>
          </Link>
        ))}
      </div>

      {/* image */}
      <div className="w-full bg-red-300 h-[300px] rounded-lg">
        <img src="" alt="portal homepage" />
      </div>
    </div>
  );
}
