import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeavesChart({ leave }) {
  const { allocatedDays } = leave;

  const data = {
    labels: ["Taken", "Remaining"],
    datasets: [
      {
        //   label: ["Allocated", "Taken", "Remaining"].map((label) => label),
        label: "Data for leave",
        data: [allocatedDays, allocatedDays], // takes an array of values [a,b]
        backgroundColor: ["orangered", "black"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[100%] h-full">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              position: "left", // or "left"
              align: "start",
              labels: {
                boxWidth: 10, // Adjust the box width if needed
                usePointStyle: true,
              },
            },
          },
        }}
      />
    </div>
  );
}
