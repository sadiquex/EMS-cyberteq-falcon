import { ChangeDate } from "../../../utils/utilityFunctions";

export default function EmployeeDetails({ selectedEmployee }) {
  const {
    name,
    age,
    userName,
    department,
    gender,
    email,
    // id,
    profileImageUrl,
    alternatePhoneNumber,
    phoneNumber,
    employmentType,
  } = selectedEmployee || {};

  // console.log(selectedEmployee);

  const dateOfBirth = ChangeDate(selectedEmployee.dateOfBirth);
  const dateAdded = ChangeDate(selectedEmployee.created);

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const ageDate = new Date(Date.now() - dob.getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // user details table
  const userDetailsTable = [
    {
      title: "Phone",
      value: phoneNumber,
    },
    // {
    //   title: "Email",
    //   value: email,
    // },
    {
      title: "User name",
      value: userName,
    },
    {
      title: "Gender",
      value: gender,
    },
    {
      title: "Employment Type",
      value: employmentType,
    },

    {
      title: "Alt. Phone Number",
      value: alternatePhoneNumber,
    },
    {
      title: "Date of Birth",
      value: dateOfBirth,
    },
    {
      title: "Age",
      value: calculateAge(selectedEmployee.dateOfBirth),
    },
    {
      title: "Date Added",
      value: dateAdded,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2>Employee Details</h2>
      </div>
      {/* personal info card */}
      <div className="grid grid-cols-[4,1fr] md:grid-cols-[220px,1fr] gap-4">
        <div className="bg-gray-50 row-span-2 flex flex-col items-center gap-4 p-4 shadow-sm">
          <div className="w-full text-center">
            Profile of{" "}
            <span className="font-semibold">
              {gender === "female" ? "Mrs. " : "Mr. "}
              {name}
            </span>
          </div>
          <img
            className="w-48 h-48 rounded-full object-cover object-center"
            src={profileImageUrl}
            alt={name}
          />
        </div>
        {/* account info */}
        <div className="bg-gray-50 p-4 flex flex-col gap-5">
          <div className="w-full">Account details</div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <p>Department</p>
              <div className="p-2 bg-gray-100 font-medium">{department}</div>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-4">
            {userDetailsTable.map((detail, i) => (
              <div className="flex-1 flex flex-col gap-2" key={i}>
                <p>{detail.title}</p>
                <div className="p-2 bg-gray-100 capitalize font-medium">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="bg-primaryColor font-semibold gap-4 p-4 shadow-sm">
          Other info
        </div> */}
      </div>
    </div>
  );
}
