import { IoCloseSharp } from "react-icons/io5";
import {
  ChangeDate,
  calculateLeaveDuration,
} from "../../../utils/utilityFunctions";

export default function ViewEmployeeDetails({ closeModal, selectedEmployee }) {
  const leaveDuration = calculateLeaveDuration(
    selectedEmployee.startDate,
    selectedEmployee.endDate
  );

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
                  <tr className="border-b bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4">ID</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.id}
                    </td>
                  </tr>
                  <tr className="border-b bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4">First Name</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.firstName}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">Last Name</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.lastName}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-100 ">
                    <td className="whitespace-nowrap px-6 py-4">Email</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.email}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">
                      Employment Type
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.employmentType}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-100 ">
                    <td className="whitespace-nowrap px-6 py-4">Date Added</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.date}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">Role</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.role}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">
                      Phone Number
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedEmployee.phoneNumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
