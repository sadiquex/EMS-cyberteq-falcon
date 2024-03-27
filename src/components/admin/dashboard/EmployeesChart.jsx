import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useEmployees from "../../../hooks/useEmployees";

export default function EmployeesChart() {
  const [departmentData, setDepartmentData] = useState({});
  const {
    isLoading: isEmployeesLoading,
    error: isError,
    employees,
    refetch,
  } = useEmployees();

  // Aggregate employees by department
  useEffect(() => {
    if (employees) {
      const data = {};
      employees.forEach((emp) => {
        if (data[emp.department.name]) {
          data[emp.department.name]++;
        } else {
          data[emp.department.name] = 1;
        }
      });
      setDepartmentData(data);
    }
  }, [employees]);

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: "Total Staff From each department",
        data: Object.values(departmentData),
        backgroundColor: [
          "#A4A9AD",
          "#E58F65",
          "#50AF95",
          "#F7EE7F",
          "#FBBFCA",
        ],
        borderColor: "transparent",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Employees Data by Department",
            },
          },
        }}
      />
    </div>
  );
}
