import Card from "../../components/_ui/Card";
import Chart from "../../components/admin/dashboard/Chart";
import RecentInformation from "../../components/admin/dashboard/RecentInformation";

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
    <div className="space-y-4">
      <h2>Dashboard</h2>

      {/* top cards container */}
      <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardDetails.map((card, i) => (
          <Card key={i}>
            <p className="font-normal text-gray-700">{card.heading}</p>
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
              {card.number}
            </h5>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* display image */}
          <figure className="flex-1">
            <img
              className="h-64 object-cover w-[100%] rounded-lg "
              src="https://citinewsroom.com/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-25-at-4.35.00-PM.jpeg"
              alt="company"
            />
          </figure>
          <div className="flex-1 max-h-64 overflow-y-scroll bg-gray-200 rounded-lg">
            <RecentInformation />
          </div>
        </div>
        {/* second column */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg">
            some other content here
          </div>
          <div className="flex-1 h-64 flex items-center justify-center overflow-hidden bg-gray-300 rounded-lg">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
