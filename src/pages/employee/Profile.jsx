import React from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Profile() {
  const { userDetails } = useUserContext();
  const { firstName, lastName } = userDetails;

  // user details table
  const userDetailsTable = [
    {
      title: "Phone",
      value: "+233 50 369 9012",
    },
    {
      title: "Address",
      value: "Tesano, Accra",
    },
    {
      title: "Email",
      value: "abubakasaddik1@gmail.com",
    },
    {
      title: "Gender",
      value: "Male",
    },
  ];

  return (
    <div className="space-y-4">
      <h2>My Details</h2>
      {/* personal info card */}

      {/* <div className="bg-red-200 shadow-xl rounded-lg p-3 flex gap-2 items-center"> */}
      <div className="shadow rounded-lg p-3 grid grid-cols-2 divide-x">
        {/* image and personal info */}
        <div className="flex items-center gap-4">
          <img
            className="w-32 h-32 rounded-full"
            src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
            alt="Joseph Boyce"
          />
          {/* personal info */}
          <div className="">
            {/* name */}
            <div>
              <h3 className="text-lg font-medium">
                {/* {firstName + " " + lastName || "Complete your profile"} */}
                {firstName + lastName
                  ? firstName + " " + lastName
                  : "Complete your profile"}
              </h3>
              <p className="text-gray-400 text-xs font-semibold">
                Web Developer
              </p>
            </div>
            {/* id */}
            <div>
              <h3 className="text-lg font-medium">ID: INT 123-456</h3>
              <p className="text-gray-400 text-xs font-semibold">BT FALCON</p>
            </div>
          </div>
        </div>

        {/* line divider here */}

        {/* contact info */}
        <div className=" h-full flex-1">
          <div className="p-2">
            <table className="text-xs my-3">
              <tbody>
                {userDetailsTable.map((row, i) => (
                  <tr key={i}>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      {row.title}
                    </td>
                    <td className="px-2 py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
