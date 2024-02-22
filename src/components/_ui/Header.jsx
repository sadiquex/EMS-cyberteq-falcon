import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const userDetails = useSelector((state) => state.user?.userDetails);

  return (
    <nav className="z-50 w-full fixed bg-primaryColor shadow">
      <div className="px-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between py-4">
          {/* left side */}
          <div className="flex items-center gap-2">
            {/* logo */}
            <span className="h-8 rounded-full flex items-center justify-center">
              <img
                src="https://media.licdn.com/dms/image/C4E0BAQFFXWSJ5DNoig/company-logo_200_200/0/1630616766212/cyberteq_logo?e=2147483647&v=beta&t=zZXYshTGK5ExNsTktGfnn9LoPIgTiUcfPtSb7YeX_DE"
                className="w-12 h-12 rounded-full object-cover object-top"
                alt="Cyberteq Falcon Logo"
              />
            </span>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-secondaryColor">
              Hey,
              {/* {userDetails.role}  */}
              {userDetails.name.split(" ")[0]}
            </span>
          </div>
          {/* right side */}
          <span className="text-secondaryColor flex gap-2">
            <IoMdNotifications size={24} />
            <Link>
              {/* to="/employee/profile" */}
              <FaUserCircle size={24} />
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
}
