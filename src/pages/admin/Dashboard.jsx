import Card from "../../components/_ui/Card";
import EmployeesChart from "../../components/admin/dashboard/EmployeesChart";
import RecentInformation from "../../components/admin/dashboard/RecentInformation";
import SlidingImage from "../../components/_ui/SlidingImage";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { CardSkeleton } from "../../components/_ui/Skeletons";

export default function Dashboard() {
  // Use React Query to fetch employees
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const response = await API.get("/Users");

        if (response.status === 200) {
          return response.data?.result;
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error.message + " getting leaves");
      }
    },
  });

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
    <div className="space-y-4">
      <h2>Dashboard</h2>

      {/* Display loading indicator while data is fetching */}
      {isLoading ? (
        <CardSkeleton />
      ) : isError ? (
        // Display error message if data fetching fails
        <div>Error fetching data...</div>
      ) : (
        // Display top cards container if data is available
        <div className="md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <SlidingImage />
          </figure>
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
            {employees && <EmployeesChart employees={employees} />}
          </div>
        </div>
        {/* Second column */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg">
            {/* Some other content here */}.
          </div>

          <div className="flex-1 max-h-64 overflow-y-scroll bg-gray-200 rounded-lg">
            <RecentInformation />
          </div>
        </div>
      </div>
    </div>
  );
}
