import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { TbStatusChange } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/UserSlice";

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { profileCompleted, employmentType } = useSelector(
    (state) => state.user?.userDetails
  );

  // if employmentType !== 'FTIME', don't show the leave status tab

  const links = [
    {
      name: "Dashboard",
      route: "/employee/dashboard",
      icon: <MdDashboard size={24} />,
      child: "",
    },
    {
      name: "Profile",
      route: "/employee/profile",
      icon: <FaUser size={24} />,
      child: "",
    },
    // conditionally include the "Leave Status" tab based on employmentType
    ...(employmentType === "FTIME"
      ? [
          {
            name: "Leave Status",
            route: "/employee/leave-status",
            icon: <TbStatusChange size={24} />,
            child: "2",
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

  return (
    <div className="fixed">
      <aside className="z-40 bg-primaryColor h-screen shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="px-3 pt-6 bg-primaryColor flex flex-col justify-between h-[calc(100%-10%)] ">
          <ul className="space-y-6 font-medium w-[50px] md:w-[230px]">
            {links.map(
              (link, i) =>
                // only render the "Complete Profile" tab if profileCompleted is false
                !(
                  link.name === "Complete Profile" &&
                  profileCompleted === "True"
                ) && (
                  <li
                    key={i}
                    className="border-2 border-gray-200 border-dashed"
                  >
                    <Link
                      to={link.route}
                      className={`flex items-center p-2 text-gray-900  hover:bg-gray-100 ${
                        location.pathname === link.route
                          ? "bg-secondaryColor text-white font-bold border-none hover:bg-secondaryColor"
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
                )
            )}
          </ul>
          <Link
            to="/"
            className="mb-10 py-4 text-primaryColor flex justify-center gap-1 bg-secondaryColor"
            onClick={() => dispatch(logOut())}
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
