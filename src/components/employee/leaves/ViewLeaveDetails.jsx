import { IoCloseSharp } from "react-icons/io5";
import {
  ChangeDate,
  calculateLeaveDuration,
} from "../../../utils/utilityFunctions";
import Button from "./../../_ui/Button.jsx";

export default function ViewLeaveDetails({ closeModal, selectedLeave }) {
  const leaveDuration = calculateLeaveDuration(
    selectedLeave.startDate,
    selectedLeave.endDate
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] font-bold text-center text-slate-900">
          Leave details
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
                    <td className="whitespace-nowrap px-6 py-4">Leave Type</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedLeave.leaveType?.name} Leave
                    </td>
                  </tr>
                  <tr className="border-b bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4">Start Date</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {ChangeDate(selectedLeave.startDate)}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">End Date</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {ChangeDate(selectedLeave.endDate)}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-100 ">
                    <td className="whitespace-nowrap px-6 py-4">Duration</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {leaveDuration}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">Reason</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedLeave.purpose}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-100 ">
                    <td className="whitespace-nowrap px-6 py-4">
                      Leave Status
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedLeave.status}
                    </td>
                  </tr>

                  <tr className="border-b bg-neutral-50 ">
                    <td className="whitespace-nowrap px-6 py-4">
                      Who covers in your absence:
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {selectedLeave.cover}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Button>Okay</Button>
    </div>
  );
}
