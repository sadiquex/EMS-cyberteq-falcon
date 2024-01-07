export default function LeaveApprovalModal({ approveModalHandler }) {
  return (
    <ul className="absolute right-[12%] py-4 text-sm w-44 flex flex-col items-center justify-center gap-3 bg-gray-700 divide-y text-white divide-gray-100 rounded-md shadow text-center">
      <li
        className="cursor-pointer hover:bg-gray-400 w-full"
        onClick={approveModalHandler}
      >
        Approve
      </li>
      <li
        className="cursor-pointer hover:bg-gray-400 w-full"
        onClick={approveModalHandler}
      >
        Decline
      </li>
    </ul>
  );
}
