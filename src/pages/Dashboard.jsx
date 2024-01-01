import React from "react";
import Card from "../components/_ui/Card";
import Chart from "../components/dashboard/Chart";

export default function Dashboard() {
  const cardDetails = [
    {
      heading: "Total Employees",
      number: 44,
    },
    {
      heading: "On Leave",
      number: 18,
    },
    {
      heading: "On Duty",
      number: 26,
    },
  ];

  return (
    <div className="flex-1 p-10 flex flex-col gap-4">
      <h2>Dashboard</h2>

      {/* card container */}
      <div className="max-w-[1000px] grid grid-cols-3 ">
        {cardDetails.map((card, i) => (
          <Card key={i}>
            <p className="font-normal text-gray-700">{card.heading}</p>
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
              {card.number}
            </h5>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        {/* display image */}
        <figure className="flex-1">
          <img
            className="h-[260px] object-cover w-[100%] rounded-lg "
            src="https://images.pexels.com/photos/5579045/pexels-photo-5579045.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="company"
          />
        </figure>
        <div className="flex-1 bg-gray-300 rounded-lg">
          Chart of employees on leave
          <Chart />
        </div>
      </div>
    </div>
  );
}
