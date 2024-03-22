import { useSelector } from "react-redux";
import Card from "../../components/_ui/Card";
import RecentInformation from "../../components/_ui/RecentInformation";
import { useEffect } from "react";
import EmployeesChart from "../../components/admin/dashboard/EmployeesChart";
import API from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import SlidingImage from "../../components/_ui/SlidingImage";
import { toast } from "react-toastify";
import Portals from "../../components/Portals";
import { todayDate } from "../../utils/utilityFunctions";
import { FaCalendarAlt } from "react-icons/fa";
import { CardSkeleton } from "../../components/_ui/Skeletons";
import useUserData from "../../hooks/useUserData";
import GreetingCard from "../../components/_ui/GreetingCard";

export default function Dashboard() {
  const {
    id,
    profileCompleted,
    name,
    departmentId: managerDepartmentId,
  } = useSelector((state) => state.user?.userDetails) || {};
  const { userData } = useUserData(id);

  const {
    isLoading,
    error,
    data: employees,
  } = useQuery({
    queryKey: "employees",
    queryFn: async () => {
      const response = await API.get("/Users");
      return response.data.result;
    },
  });

  useEffect(() => {
    if (profileCompleted !== "True") {
      toast.warning("Please complete your profile");
    }
  }, []);

  // filter employees in the same department
  const departmentEmployees = employees?.filter(
    (employee) => employee.department.id === managerDepartmentId
  );

  const cardDetails = [
    {
      heading: "Total Employees",
      number: departmentEmployees?.length || 0,
    },
    {
      heading: "On Leave",
      number: 0,
    },
    {
      heading: "On Duty",
      number: 0,
    },
  ];

  return (
    <div className="space-y-4 md:max-w-[1000px]">
      <h2>Dashboard</h2>

      {/* user profile card */}
      <GreetingCard userData={userData} />

      <Portals />

      {/* top cards container */}
      <div className="md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading
          ? [1, 2, 3].map((num, i) => <CardSkeleton key={i} />)
          : cardDetails.map((card, i) => (
              <Card key={i}>
                <p className="font-normal text-gray-700">{card.heading}</p>
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
                  {card.number}
                </h5>
              </Card>
            ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 h-64">
          <figure className="flex-1 flex items-center justify-center rounded-lg overflow-hidden">
            <SlidingImage />
          </figure>

          <div className="flex-1 overflow-y-auto bg-primaryColor rounded-lg">
            <RecentInformation />
          </div>
        </div>
        {/* second column */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg">
            some other content here
          </div>

          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
            <EmployeesChart />
          </div>
        </div>
      </div>
    </div>
  );
}
