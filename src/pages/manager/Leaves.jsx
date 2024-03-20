import LeavesTable from "../../components/manager/manage-leaves/LeavesTable";
import useUserData from "../../hooks/useUserData";

export default function Leaves() {
  const { userData } = useUserData();
  // console.log(userData);
  // get the department

  return (
    <div className=" flex flex-col gap-2">
      <h2>Leaves From My Department</h2>
      <LeavesTable />
    </div>
  );
}
