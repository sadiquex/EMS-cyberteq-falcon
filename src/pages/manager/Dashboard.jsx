import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/_ui/Card";
import RecentInformation from "../../components/admin/dashboard/RecentInformation";
import { fetchUsers } from "../../redux/features/admin-slices/adminEmployeesSlice";
import { useEffect } from "react";
import EmployeesChart from "../../components/admin/dashboard/EmployeesChart";
import API from "../../api/axios";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { userDetails } = useSelector((state) => state.user);
  const managerDepartmentId = userDetails.departmentId;

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

  // Filter employees by department
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
      number: departmentEmployees?.length ? departmentEmployees.length - 5 : 0,
    },
    {
      heading: "On Duty",
      number: departmentEmployees?.length ? departmentEmployees.length - 5 : 0,
    },
  ];

  return (
    <div className="space-y-4">
      <h2>Dashboard</h2>

      {/* top cards container */}
      <div className="md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          cardDetails.map((card, i) => (
            <Card key={i}>
              <p className="font-normal text-gray-700">{card.heading}</p>
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
                {card.number}
              </h5>
            </Card>
          ))
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* display image */}
          <figure className="flex-1">
            <img
              className="h-64 object-cover object-top w-[100%] rounded-lg "
              src="https://thebftonline.com/wp-content/uploads/2022/12/Cyberteq-is-Cybersecurity-Consulting-Company-of-the-Year-again.jpg"
              alt="company"
            />
          </figure>

          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
            <EmployeesChart />
          </div>
        </div>
        {/* second column */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg">
            some other content here
          </div>
          <div className="flex-1 max-h-64 overflow-y-scroll bg-gray-200 rounded-lg">
            <RecentInformation />
          </div>
        </div>
      </div>
    </div>
  );
}
