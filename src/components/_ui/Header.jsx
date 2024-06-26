import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/features/UserSlice";
import { CiLogout } from "react-icons/ci";
import useUserData from "../../hooks/useUserData";
import { Spinner } from "./Spinner";

export default function Header() {
  const dispatch = useDispatch();

  const { id, role } = useSelector((state) => state.user?.userDetails);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userData, userDataLoading, userDataError } = useUserData(id);

  const { profileImageUrl, name } = userData || {};

  // go to profile page according to role
  const getProfileLink = () => {
    switch (role) {
      case "manager":
        return "/manager/profile";
      case "user":
        return "/employee/profile";
      case "admin":
        return "/admin/profile";
      case "head":
        return "/head/profile";
      default:
        return "/";
    }
  };

  return (
    <nav className="z-50 w-full fixed bg-primaryColor rounded-2xl">
      <div className="px-4">
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
            <span className="self-center text-md font-semibold sm:text-xl whitespace-nowrap text-secondaryColor">
              Hey, {name?.split(" ")[0]}
            </span>
          </div>
          {/* right side */}
          <span className="text-secondaryColor flex gap-2 relative cursor-pointer">
            <IoMdNotifications size={30} />
            <span className="h-8 rounded-full">
              <span
                className="h-8 rounded-full flex items-center justify-center"
                onClick={() => {
                  setModalIsOpen(!modalIsOpen);
                }}
              >
                {userDataLoading ? (
                  <Spinner />
                ) : (
                  <img
                    src={profileImageUrl}
                    className="w-12 h-12 rounded-full object-cover object-top"
                    alt={name}
                  />
                )}
              </span>
            </span>

            {/* modal */}
            {modalIsOpen && (
              <ul className="absolute right-[42%] top-[100%] py-8 w-44 bg-white divide-y text-secondaryColor text-sm rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-center flex justify-center flex-col">
                <li className="cursor-pointer hover:bg-gray-100 w-full py-2">
                  <Link
                    to={getProfileLink()}
                    className="flex justify-center items-center gap-1"
                  >
                    <FaUserCircle />
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer hover:bg-gray-100 w-full py-2">
                  <Link
                    className="flex justify-center items-center gap-1"
                    onClick={() => dispatch(logOut())}
                  >
                    <CiLogout />
                    Log out
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}
