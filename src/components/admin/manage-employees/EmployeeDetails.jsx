import { ChangeDate } from "../../../utils/utilityFunctions";

export default function EmployeeDetails({ selectedEmployee }) {
  const {
    name,
    age,
    userName,
    department,
    // gender,
    email,
    // id,
    profileImageUrl,
    alternatePhoneNumber,
    phoneNumber,
    employmentType,
  } = selectedEmployee || {};

  const dateOfBirth = ChangeDate(selectedEmployee.dateOfBirth);
  const dateAdded = ChangeDate(selectedEmployee.created);

  // format gender to capitalize first letter
  const formattedGender =
    selectedEmployee.gender &&
    selectedEmployee.gender.charAt(0).toUpperCase() +
      selectedEmployee.gender.slice(1);

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
      title: "Email",
      value: email,
    },
    {
      title: "Gender",
      value: formattedGender,
    },
    {
      title: "Employment Type",
      value: employmentType,
    },
    {
      title: "Date created",
      value: dateAdded,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2>Employee Details</h2>
      </div>
      {/* personal info card */}
      <div className="shadow rounded-lg p-3 grid grid-cols-2 divide-x">
        {/* image and personal info */}
        <div className="flex items-center gap-4">
          <img
            className="w-32 h-32 rounded-full object-cover object-top"
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
              <h3 className="text-lg font-medium">Department: {department}</h3>
              {/* <p className="text-gray-400 text-xs font-semibold">
                {department}
              </p> */}
            </div>
          </div>
        </div>

        {/* line divider here */}

        {/* contact info */}
        <div className="flex-1">
          <div className="p-2">
            <table className="text-xs my-3">
              <tbody>
                {userDetailsTable.map((row, i) => (
                  <tr key={i}>
                    <td className="px-2 py-2 font-semibold md:text-sm lg:text-lg">
                      {row.title}
                    </td>
                    <td className="px-2 py-2 sm:text-sm lg:text-lg">
                      {row.value}
                    </td>
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
