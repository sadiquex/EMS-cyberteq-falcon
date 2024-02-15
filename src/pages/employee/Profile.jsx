import { useSelector } from "react-redux";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ChangeDate } from "../../utils/utilityFunctions";
import Button from "../../components/_ui/Button";
import { Link } from "react-router-dom";

export default function Profile() {
  const userDetails = useSelector((state) => state.user?.userDetails);
  const { id } = useSelector((state) => state.user?.userDetails);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/Users/user-profile/${id}`);
        setUserData(response.data.result);
        // toast.success(response.status);
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    const getSensitiveUserData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/Users/sensitive-user-data/${id}`);
        console.log("sensitive " + response.data.result);
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
    getSensitiveUserData();
  }, [id]);

  const {
    name,
    age,
    created,
    userName,
    department,
    gender,
    // id,
    dateOfBirth,
    ghanaCardNumber,
    ssnitNumber,
    bankAccountNumber,
    profileImageUrl,
    phoneNumber,
    alternatePhoneNumber,
    employmentType,
  } = userData ?? {};

  const email = userDetails.email;
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
        <h2>My Details</h2>
        <button className="text-primaryColor bg-secondaryColor hover:brightness-125 font-medium rounded-lg text-sm px-8 py-2.5 text-center">
          <Link to="/employee/complete-profile">Edit Profile</Link>
        </button>
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
              <p className="text-gray-400 font-semibold">
                {employmentType} Employee
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
        <table className="my-3">
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
