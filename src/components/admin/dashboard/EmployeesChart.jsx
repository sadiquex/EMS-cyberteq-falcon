import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

const Data = [
  {
    id: 3,
    department: "Falcon",
    staffOnDuty: 7,
    staffOnLeave: 2,
  },
  {
    id: 4,
    department: "InfoSec",
    staffOnDuty: 4,
    staffOnLeave: 3,
  },
  {
    id: 5,
    department: "SOC",
    staffOnDuty: 13,
    staffOnLeave: 4,
  },
  {
    id: 5,
    department: "Sales",
    staffOnDuty: 6,
    staffOnLeave: 0,
  },
  {
    id: 5,
    department: "Offensive",
    staffOnDuty: 9,
    staffOnLeave: 3,
  },
];

const chartData = {
  labels: Data.map((data) => data.department),
  datasets: [
    {
      label: "On Duty",
      data: Data.map((data) => data.staffOnDuty),
      backgroundColor: ["#888", "orangered", "#50AF95", "#f3ba2f", "#2a71d0"],
      borderColor: "black",
      borderWidth: 2,
    },
    {
      label: "On Leave",
      data: Data.map((data) => data.staffOnLeave),
      backgroundColor: ["#eee"],
      borderColor: "black",
      borderWidth: 2,
    },
  ],
};

export default function EmployeesChart() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Employees Data for the week",
            },
          },
        }}
      />
    </div>
  );
}