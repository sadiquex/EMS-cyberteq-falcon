import React, { useState, useEffect } from "react";
import useEmployees from "../../hooks/useEmployees";
import useLeavesData from "../../hooks/useLeavesData";
import useUserData from "../../hooks/useUserData";
import { todayDate } from "../../utils/utilityFunctions";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useSelector } from "react-redux";

/*
- get the leaves data
- get the id of the user for each leave
- get the data for each user

  */

const InfoCard = ({ userId }) => {
  const { userData, userDataLoading, userDataError } = useUserData(userId);

  if (userDataLoading) return <Spinner />;
  if (userDataError) return <div>Error: {userDataError.message}</div>;

  return (
    <div className="p-2 bg-gray-50 rounded-md w-full flex justify-between items-center">
      {/* left side */}
      <div className="flex gap-2 items-center">
        <img
          src={userData.profileImageUrl}
          className="w-12 h-12 rounded-lg object-cover object-center"
          alt={userData.name}
        />
        {/* name */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{userData.name}</p>
          <div className="text-gray-500 text-sm">Pending New Leave</div>
        </div>
      </div>

      {/* right side */}
      <div className="text-sm">26th Mar, 2024</div>
    </div>
  );
};

// main component
const RecentInformation = () => {
  const { leavesData } = useLeavesData();
  const leaveUserIds = leavesData?.map((leave) => leave.user.id);
  const { role } = useSelector((state) => state.user?.userDetails);

  return (
    <div className="p-4 flex flex-col gap-4 h-full w-full">
      <p className="text-lg">{todayDate}</p>
      <div className="space-y-1">
        {leaveUserIds?.map((userId, i) => (
          <InfoCard key={i} userId={userId} />
        ))}
      </div>

      <Link to={`/${role}/leaves`}>
        <button className="bg-transparent text-secondaryColor rounded-sm p-2 w-full whitespace-nowrap border-2 border-secondaryColor transition-all duration-300 ease-in-out hover:bg-secondaryColor hover:text-primaryColor hover:brightness-110">
          View all leaves
        </button>
      </Link>
    </div>
  );
};

export default RecentInformation;
