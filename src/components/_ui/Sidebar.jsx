import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdTimeToLeave } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import useLeavesData from "../../hooks/useLeavesData";
import { useSelector } from "react-redux";
import { TbStatusChange } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { PiDivideFill } from "react-icons/pi";

export default function Sidebar() {
  const location = useLocation();
  const { leavesData } = useLeavesData();
  const pendingLeaves = leavesData?.filter(
    (leave) => leave.status === "Pending"
  );

  const { role, id, profileCompleted, employmentType } = useSelector(
    (state) => state.user?.userDetails
  );

  // dynamically render the content on the sidebar
  let links = [];

  if (role === "admin") {
    links = [
      {
        name: "Dashboard",
        route: "/admin/dashboard",
        icon: <MdDashboard size={24} />,
        child: "",
      },
      {
        name: "Manage Employees",
        route: "/admin/employees",
        icon: <FaUsers size={24} />,
        child: "",
      },
      {
        name: "Leave Requests",
        route: "/admin/leaves",
        icon: <MdTimeToLeave size={24} />,
        child: pendingLeaves?.length || "",
      },
    ];
  } else if (role === "user") {
    links = [
      {
        name: "Dashboard",
        route: "/employee/dashboard",
        icon: <MdDashboard size={24} />,
        child: "",
      },
      // conditionally include the "Leave Status" tab based on employmentType
      ...(employmentType === "FTIME"
        ? [
            {
              name: "Leave Status",
              route: "/employee/leave-status",
              icon: <TbStatusChange size={24} />,
              child: pendingLeaves?.length || "",
            },
          ]
        : []),
      // conditionally include the "Complete Profile" tab based on profileCompleted
      ...(profileCompleted === "False"
        ? [
            {
              name: "Complete Profile",
              route: "/employee/complete-profile",
              icon: <GrUserWorker size={24} />,
            },
          ]
        : []),
    ];
  } else if (role === "manager") {
    links = [
      {
        name: "Dashboard",
        route: "/manager/dashboard",
        icon: <MdDashboard size={24} />,
        child: "",
      },
      {
        name: "Dept. Leaves",
        route: "/manager/leaves",
        icon: <PiDivideFill size={24} />,
        child: pendingLeaves?.length || "",
      },
      {
        name: "Manage Employees",
        route: "/manager/employees",
        icon: <FaUsers size={24} />,
        child: "",
      },

      // conditionally include the "Complete Profile" tab based on profileCompleted
      ...(profileCompleted === "False"
        ? [
            {
              name: "Complete Profile",
              route: "/manager/complete-profile",
              icon: <GrUserWorker size={24} />,
            },
          ]
        : []),
    ];
  } else if (role === "head") {
    links = [
      {
        name: "Dashboard",
        route: "/head/dashboard",
        icon: <MdDashboard size={24} />,
        child: "",
      },
      {
        name: "Manage Employees",
        route: "/head/employees",
        icon: <FaUsers size={24} />,
        child: "",
      },
      {
        name: "Leave Requests",
        route: "/head/leaves",
        icon: <MdTimeToLeave size={24} />,
        child: pendingLeaves?.length || "",
      },
    ];
  }

  return (
    <div className="fixed rounded-md px-2">
      <aside className="z-40 h-screen">
        <div className="px-3 pt-4 bg-primaryColor rounded-2xl flex flex-col justify-between shadow-sm h-full md:h-[calc(100%-18%)]">
          <ul className="space-y-6 font-medium w-[50px] md:w-[230px] transition-all duration-300">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.route}
                  className={`rounded-md flex items-center p-3 text-gray-900  hover:bg-gray-100 ${
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
        </div>
      </aside>
    </div>
  );
}
