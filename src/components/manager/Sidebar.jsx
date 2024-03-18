import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdTimeToLeave } from "react-icons/md";
import { PiDivideFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GrUserWorker } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/axios";
import { CardSkeleton } from "../_ui/Skeletons";
import { toast } from "react-toastify";

export default function Sidebar() {
  const location = useLocation();
  const { id, name, profileCompleted } = useSelector(
    (state) => state.user?.userDetails
  );

  // Fetch user data using React Query
  const {
    isLoading: userDataLoading,
    isError: userDataError,
    data: userData,
  } = useQuery({
    queryKey: ["userData", id], // query for only that current user
    queryFn: async () => {
      const response = await API.get(`/Users/user-profile/${id}`);
      return response.data.result;
    },
    enabled: !!id,
    onError: (error) => {
      toast.error(error);
    },
  });

  const links = [
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
      child: "3",
    },
    // {
    //   name: "My Leaves",
    //   route: "/manager/leaves-status",
    //   icon: <MdTimeToLeave size={24} />,
    //   child: "",
    // },
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

  return (
    <div className="fixed">
      <aside className="z-40 h-screen ">
        <div className="px-3 pt-6 bg-primaryColor flex flex-col justify-between h-full md:h-[calc(100%-10%)]">
          <ul className="space-y-6 font-medium w-[50px] md:w-[230px] transition-all duration-300">
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
        </div>
      </aside>
    </div>
  );
}
