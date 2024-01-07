import Card from "../../components/_ui/Card";
import { FaBowlFood } from "react-icons/fa6";
import { GiVideoConference } from "react-icons/gi";
import { MdTimeToLeave } from "react-icons/md";
import { Link } from "react-router-dom";

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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-lg w-20 h-20 bg-red-400 p-[2px]">
          <img
            src="https://images.pexels.com/photos/6999225/pexels-photo-6999225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Joseph Boyce"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 flex flex-col bg-gray-200 p-3">
          <p className="text-lg font-bold">Welcome, Joseph Boyce</p>
          <p className="text-sm">Monday, 20th Feb 2024</p>
        </div>
      </div>

      {/* portals' cards display */}
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
      <div className="w-full bg-red-300 md:h-[400px] p-1 rounded-lg">
        <img
          src="https://images.pexels.com/photos/296115/pexels-photo-296115.jpeg"
          alt="portal homepage"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
