import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { MdTimeToLeave } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <MdDashboard />,
      child: "",
    },
    {
      name: "Employees",
      route: "/employees",
      icon: <GrUserWorker />,
      child: "+",
    },
    {
      name: "Leaves",
      route: "/leaves",
      icon: <MdTimeToLeave />,
      child: "3",
    },
    {
      name: "Lunch",
      route: "/lunch",
      icon: <MdFastfood />,
      child: "",
    },
    {
      name: "Conference",
      route: "/conference",
      icon: <GiVideoConference />,
      child: "",
    },
  ];

  return (
    <aside
      className="z-40 w-64 pt-10 transition-transform bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-y-auto"
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      <div className="px-3 bg-white flex flex-col justify-between h-full">
        <ul className="space-y-6 font-medium">
          {links.map((link, i) => (
            <li key={i} className="border-2 border-gray-200 border-dashed">
              <Link
                to={link.route}
                className={`flex items-center p-2 text-gray-900  hover:bg-gray-100 ${
                  location.pathname === link.route
                    ? "bg-primaryColor text-white font-bold border-none"
                    : ""
                }`}
              >
                <span>{link.icon}</span>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {link.name}
                </span>
                {link.child && (
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-primaryColor rounded-full ">
                    {link.child}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="mb-10 py-4 text-white flex justify-center gap-1 bg-secondaryColor"
        >
          <span>
            <CiLogout />
          </span>
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
