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
  } = userData || {};

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
      value:
        userData?.gender.charAt(0).toUpperCase() + userData?.gender.slice(1),
    },
    {
      title: "Employment Type",
      value: employmentType,
    },
  ];

  const sensitiveDataTable = [
    {
      title: "Username",
      value: userName,
    },
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
        <div className="shadow rounded-lg p-3 grid grid-cols-2 divide-x">
          {/* image and personal info */}
          <div className="flex items-center gap-4">
            <img
              className="w-32 h-32 rounded-full p-[1px] bg-red-200 object-cover object-top"
              src={profileImageUrl}
              alt={name}
            />
            {/* personal info */}
            <div className="">
              <div>
                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-gray-400 font-semibold">
                  {employmentType + " Employee"}
                </p>
              </div>
              {/* id */}
              <div>
                {/* <h3 className="text-lg font-medium">{id}</h3> */}
                <p className="text-lg font-medium">{department}</p>
              </div>
            </div>
          </div>

          {/* line divider here */}

          {/* contact info */}
          <div className=" h-full flex-1">
            <div className="p-2">
              <table className="my-3">
                <tbody>
                  {userDetailsTable.map((row, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          {row.title}
                        </td>
                        <td className="px-2 py-2">{row.value}</td>
                      </tr>
                      <tr>
                        <td>
                          <hr
                            style={{
                              border: "1px solid #E5E7EB",
                              margin: "0",
                            }}
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* other info */}
      {sensitiveDataLoading ? (
        <Spinner />
      ) : (
        <div className="w-1/2 rounded-lg p-3 grid grid-cols-2 divide-x shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <table className="my-3">
            <tbody>
              {sensitiveDataTable.map((row, i) => (
                <React.Fragment>
                  <tr key={i} className="whitespace-nowrap">
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      {row.title}
                    </td>
                    <td className="px-2 py-2 ">{row.value}</td>
                  </tr>
                  <hr
                    style={{
                      border: "1px solid #E5E7EB",
                      margin: "0",
                    }}
                  />
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
