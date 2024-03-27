import { useSelector } from "react-redux";
import API from "../../api/axios";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { ChangeDate } from "../../utils/utilityFunctions";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserData from "../../hooks/useUserData";
import { TableSkeleton } from "../../components/_ui/Skeletons";
import { Spinner } from "../../components/_ui/Spinner";

export default function Profile() {
  const { id, role, email } = useSelector((state) => state.user?.userDetails);
  // pass the user id to useUserData hook to get the data
  const { userDataLoading, userDataError, userData } = useUserData(id);
  // destructure content from userData
  const {
    name,
    userName,
    department,
    dateOfBirth,
    profileImageUrl,
    phoneNumber,
    alternatePhoneNumber,
    employmentType,
  } = userData || {
    name: "",
    userName: "",
    department: "",
    dateOfBirth: "",
    profileImageUrl: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    employmentType: "",
  };

  // divide the name into firstname and lastname
  const nameParts = name?.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts?.slice(1).join(" "); // Join the remaining parts as the last name

  const adjustedRole = role === "user" ? "employee" : role;

  // Fetch sensitive user data using React Query
  const {
    isLoading: sensitiveDataLoading,
    isError: sensitiveDataError,
    data: sensitiveData,
  } = useQuery({
    queryKey: ["sensitiveData", id],
    queryFn: async () => {
      const response = await API.get(
        // backend requires you include 'user-data' to the GET request
        `/Users/sensitive-user-data/user-data-${id}`
      );
      return response.data?.result;
    },
    enabled: !!id,
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    if (userDataError) {
      toast.error("Error fetching user data");
    }
    if (sensitiveDataError) {
      toast.error("Error fetching sensitive user data");
    }
  }, [userDataError, sensitiveDataError]);

  const { bankAccount, nationalId, tin, ssnit, apexNumber } =
    sensitiveData ?? {};

  const formattedDateOfBirth = ChangeDate(dateOfBirth);

  // user details table
  const userDetailsTable = [
    {
      title: "First Name",
      value: firstName,
    },
    {
      title: "Last Name",
      value: lastName,
    },
    {
      title: "Date of Birth",
      value: formattedDateOfBirth,
    },
    {
      title: "Phone",
      value: phoneNumber,
    },
    {
      title: "Email",
      value: email,
    },
    {
      title: "Gender",
      // format gender to capitalize first letter
      value: userData?.gender,
    },
    {
      title: "Employment Type",
      value: employmentType,
    },
    {
      title: "Role",
      value: role,
    },
  ];

  const sensitiveDataTable = [
    {
      title: "Alternative Phone No.",
      value: alternatePhoneNumber,
    },
    {
      title: "SSNIT No.",
      value: ssnit,
    },
    {
      title: "Bank Acc",
      value: bankAccount,
    },
    {
      title: "National ID Number",
      value: nationalId,
    },
    {
      title: "Apex Number",
      value: apexNumber,
    },
    {
      title: "TIN Number",
      value: tin,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2>My Details</h2>
        <button className="text-primaryColor bg-secondaryColor hover:brightness-125 font-medium rounded-lg text-sm px-8 py-2.5 text-center">
          <Link to={`/${adjustedRole}/complete-profile`}>Edit Profile</Link>
        </button>
      </div>
      {/* personal info card */}
      {userDataLoading ? (
        <TableSkeleton />
      ) : (
        <div className="grid grid-cols-[4,1fr] md:grid-cols-[260px,1fr] gap-4">
          {/* profile info */}
          <div className="bg-primaryColor row-span-2 flex flex-col items-center gap-4 p-4 shadow-sm">
            <div className="w-full text-center">
              Profile of <span className="font-semibold">{name}</span>
            </div>
            <img
              className="w-48 h-48 rounded-full object-cover object-center"
              src={profileImageUrl}
              alt={firstName}
            />
          </div>
          {/* account details */}
          <div className="bg-primaryColor p-4 flex flex-col gap-5">
            <div className="w-full">
              Account details of{" "}
              <span className="font-semibold">
                {userData?.gender === "female" ? "Mrs. " : "Mr. "}
                {name}
              </span>
            </div>

            {/* details */}
            <div className="w-full flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <p>Department</p>
                <div className="p-2 bg-gray-100 uppercase">{department}</div>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-4">
              {userDetailsTable?.map((detail, i) => (
                <div className="flex-1 flex flex-col gap-2" key={i}>
                  <p>{detail?.title}</p>
                  <div className="p-2 bg-gray-100 uppercase">
                    {detail?.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* sensitive */}
      {sensitiveDataLoading ? (
        <Spinner />
      ) : (
        <div className="bg-primaryColor p-4 flex flex-col gap-5">
          <div className="w-full font-semibold">Other Information</div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <p>Username</p>
              <div className="p-2 bg-gray-100">{userName}</div>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-4">
            {sensitiveDataTable.map((detail, i) => (
              <div className="flex-1 flex flex-col gap-2" key={i}>
                <p>{detail.title}</p>
                <div className="p-2 bg-gray-100">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
