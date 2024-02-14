import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../_ui/Button";
import { ChangeDate } from "../../../utils/utilityFunctions";

export default function EmployeeDetails({ selectedEmployee }) {
  const [userData, setUserData] = useState(null);
  const [sensitiveData, setSensitiveData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    name,
    age,
    created,
    userName,
    department,
    gender,
    email,
    // id,
    profileImageUrl,
    alternatePhoneNumber,
    employmentType,
  } = selectedEmployee;

  const { ghanaCardNumber, ssnitNumber, bankAccountNumber, phoneNumber } =
    sensitiveData ?? {};

  const dateOfBirth = ChangeDate(selectedEmployee.dateOfBirth);

  // user details table
  const userDetailsTable = [
    {
      title: "Date of Birth",
      value: dateOfBirth,
    },
    {
      title: "Phone",
      value: phoneNumber,
    },
    {
      title: "Address",
      value: "--",
    },
    {
      title: "Email",
      value: email,
    },
    {
      title: "Gender",
      value: gender,
    },
    {
      title: "Employment Type",
      value: employmentType,
    },
  ];

  const otherDetailsTable = [
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
      value: ssnitNumber,
    },
    {
      title: "Bank Acc",
      value: bankAccountNumber,
    },
    {
      title: "Ghana Card",
      value: ghanaCardNumber,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2>Employee Details</h2>
      </div>
      {/* personal info card */}

      {/* <div className="bg-red-200 shadow-xl rounded-lg p-3 flex gap-2 items-center"> */}
      <div className="shadow rounded-lg p-3 grid grid-cols-2 divide-x">
        {/* image and personal info */}
        <div className="flex items-center gap-4">
          <img
            className="w-32 h-32 rounded-full p-1 bg-red-400 object-cover object-top"
            src={profileImageUrl}
            alt={name}
          />
          {/* personal info */}
          <div className="">
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-gray-400 text-xs font-semibold">
                {employmentType} Employee
              </p>
            </div>
            {/* id */}
            <div>
              <h3 className="text-lg font-medium">ID: INT 123-456</h3>
              <p className="text-gray-400 text-xs font-semibold">
                {department}
              </p>
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

      {/* other info */}
      <div className="w-1/2 rounded-lg p-3 grid grid-cols-2 divide-x shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <table className="text-xs my-3">
          <tbody>
            {otherDetailsTable.map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-2 text-gray-500 font-semibold whitespace-nowrap">
                  {row.title}
                </td>
                <td className="px-2 py-2">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}