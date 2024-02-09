import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdTimeToLeave } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      route: "/manager/dashboard",
      icon: <MdDashboard size={24} />,
      child: "",
    },
    {
      name: "Leave Requests",
      route: "/manager/leaves",
      icon: <MdTimeToLeave size={24} />,
      child: "3",
    },
  ];

  return (
    <div className="fixed">
      <aside className="z-40 h-screen shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="px-3 pt-6 bg-primaryColor flex flex-col justify-between h-full md:h-[calc(100%-10%)] ">
          <ul className="space-y-6 font-medium">
            {links.map((link, i) => (
              <li key={i} className="border-2 border-gray-200 border-dashed">
                <Link
                  to={link.route}
                  className={`flex items-center p-2 text-gray-900  hover:bg-gray-100 ${
                    location.pathname === link.route
                      ? "bg-secondaryColor text-primaryColor font-bold border-none hover:bg-secondaryColor"
                      : ""
                  }`}
                >
                  <span className="font-[30px]">{link.icon}</span>
                  <span className="flex-1 ms-3 hidden md:block whitespace-nowrap">
                    {link.name}
                  </span>
                  {link.child && (
                    <span className="hidden md:inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-secondaryColor bg-primaryColor rounded-full ">
                      {link.child}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            className="mb-10 py-4 text-primaryColor flex justify-center gap-1 bg-secondaryColor"
          >
            <span>
              <CiLogout />
            </span>
            <span className="hidden md:block">Log out</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
