import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { MdTimeToLeave } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";

export default function Sidebar({ children }) {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      route: "/admin/dashboard",
      icon: <MdDashboard size={24} />,
      child: "",
    },
    {
      name: "Employees",
      route: "/admin/employees",
      icon: <GrUserWorker size={24} />,
      child: "+",
    },
    {
      name: "Leaves",
      route: "/admin/leaves",
      icon: <MdTimeToLeave size={24} />,
      child: "3",
    },
    {
      name: "Lunch",
      route: "/admin/lunch",
      icon: <MdFastfood size={24} />,
      child: "",
    },
    {
      name: "Conference",
      route: "/admin/conference-room",
      icon: <GiVideoConference size={24} />,
      child: "",
    },
  ];

  return (
    <div className="flex">
      <aside className="z-40 w-20 md:w-64 pt-20 fixed bg-white h-screen shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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
                  <span className="font-[30px]">{link.icon}</span>
                  <span className="flex-1 ms-3 hidden md:block whitespace-nowrap">
                    {link.name}
                  </span>
                  {link.child && (
                    <span className="hidden md:inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-primaryColor rounded-full ">
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
      <div className=" bg-pink-300 w-full ml-20 md:ml-64 mt-12">{children}</div>
    </div>
  );
}
