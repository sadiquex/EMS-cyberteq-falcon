import { IoCloseSharp } from "react-icons/io5";

export default function ViewEmployeeDetails({
  closeModal,
  selectedEmployee,
  loading,
}) {
  const {
    id,
    email,
    name,
    employmentType,
    department,
    date,
    roles,
    created,
    phoneNumber,
  } = selectedEmployee;

  const [firstName, lastName] = name.split(" ");

  const employeeDetails = [
    {
      field: "ID",
      value: id,
    },
    {
      field: "First Name",
      value: firstName,
    },
    {
      field: "Last Name",
      value: lastName,
    },
    {
      field: "Email",
      value: email,
    },
    {
      field: "Employment type",
      value: employmentType.name,
    },
    {
      field: "Department",
      value: department.name,
    },
    {
      field: "Date Added",
      value: created,
    },
    {
      field: "Phone Number",
      value: phoneNumber,
    },
    {
      field: "Role",
      // value: roles.map((role) => role),
      value: roles,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] font-bold text-center text-slate-900">
          Employee details
        </h2>
        <button
          type="button"
          className="end-2.5 text-black bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
          onClick={closeModal}
        >
          <IoCloseSharp />
        </button>
      </div>

      {/* details here */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-lg">
                      Field
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeDetails.map((detail, i) => (
                    <tr
                      className={`border-b ${
                        i % 2 === 0 ? "bg-neutral-100" : "bg-neutral-50"
                      }`}
                      key={i}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {detail.field}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {detail.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
