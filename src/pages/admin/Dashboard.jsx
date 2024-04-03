import Card from "../../components/_ui/Card";
import EmployeesChart from "../../components/admin/dashboard/EmployeesChart";
import RecentInformation from "../../components/_ui/RecentInformation";
import SlidingImage from "../../components/_ui/SlidingImage";
import Carousel from "../../components/_ui/Carousel";
import { CardSkeleton } from "../../components/_ui/Skeletons";
import useUserData from "../../hooks/useUserData";
import { useSelector } from "react-redux";
import GreetingCard from "../../components/_ui/GreetingCard";
import useEmployees from "../../hooks/useEmployees";

export default function Dashboard() {
  const { id } = useSelector((state) => state.user?.userDetails);
  const { userData } = useUserData(id);
  const {
    isLoading: isEmployeesLoading,
    error: isError,
    employees,
    refetch,
  } = useEmployees();

  const cardDetails = [
    {
      heading: "Total Employees",
      number: employees ? employees.length : 0,
    },
    {
      heading: "On Leave",
      number: employees
        ? employees.filter((employee) => employee.onLeave).length
        : 0,
    },
    {
      heading: "On Duty",
      number: employees
        ? employees.filter((employee) => !employee.onLeave).length
        : 0,
    },
  ];

  return (
    <div className="space-y-4 md:max-w-[1000px]">
      <h2>Dashboard</h2>

      <GreetingCard userData={userData} />

      {/* Display loading indicator while data is fetching */}
      {isEmployeesLoading ? (
        <CardSkeleton />
      ) : isError ? (
        // Display error message if data fetching fails
        <div>Error fetching data...</div>
      ) : (
        // Display top cards container if data is available
        <div className="w-full flex justify-between flex-wrap gap-4">
          {cardDetails.map((card, i) => (
            <Card key={i}>
              <p className="font-normal text-gray-700">{card.heading}</p>
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
                {card.number}
              </h5>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Display image */}
          <figure className="flex-1 flex items-center justify-center rounded-lg overflow-hidden">
            {/* <SlidingImage /> */}
            <Carousel />
          </figure>

          <div className="flex-1 max-h-64 overflow-y-auto bg-primaryColor rounded-lg">
            <RecentInformation />
          </div>
        </div>
        {/* Second column */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg">
            {/* Some other content here */}.
          </div>

          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
            {employees && <EmployeesChart />}
          </div>
        </div>
      </div>
    </div>
  );
}
