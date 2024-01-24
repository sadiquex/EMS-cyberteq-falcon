import { useSelector } from "react-redux";

export default function Profile() {
  // const userDetails = useSelector((state) => state.user?.userDetails);
  const userDetails = {};

  const {
    name,
    dateOfBirth,
    gender,
    ghanaCardNumber,
    ssnitNumber,
    bankAccountNumber,
    alternatePhoneNumber,
    profilePicture,
  } = userDetails;

  // user details table
  const userDetailsTable = [
    {
      title: "Date of Birth",
      value: dateOfBirth,
    },
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
      value: gender,
    },
  ];

  const otherDetailsTable = [
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
    {
      title: "Alt. Phone No.",
      value: alternatePhoneNumber,
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
            src={
              profilePicture ||
              "https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
            }
            alt="Joseph Boyce"
          />
          {/* personal info */}
          <div className="">
            {/* name */}
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
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
      {/* other info */}
      <div className="w-1/2 rounded-lg p-3 grid grid-cols-2 divide-x shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <table className="text-xs my-3">
          <tbody>
            {otherDetailsTable.map((row, i) => (
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
  );
}
