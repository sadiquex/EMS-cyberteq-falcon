import Card from "../../components/_ui/Card";
import { FaBowlFood } from "react-icons/fa6";
import { GiVideoConference } from "react-icons/gi";
import { MdOutlineTimeToLeave, MdTimeToLeave } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CardSkeleton } from "../../components/_ui/Skeletons";

export default function Dashboard() {
  const userDetails = useSelector((state) => state.user?.userDetails);
  const [portals, setPortals] = useState([]);
  const userToken = localStorage.getItem("userToken");
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getPortals = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/Portal", {
          // headers: { Authorization: `Bearer ${userToken}` },
        });

        // manually add route and portal icons
        const mappedPortals = response.data.result.map((portal) => {
          return {
            ...portal,
            route: mapRouteAndIcon(portal.id).route,
            icon: mapRouteAndIcon(portal.id).icon,
          };
        });

        setPortals(mappedPortals);
        setLoading(false);
      } catch (error) {
        console.error("error getting portals:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getPortals();

    // Cleanup fucntion
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [userToken]);

  // manually map portal IDs to routes and icons
  const mapRouteAndIcon = (portalId) => {
    switch (portalId) {
      case "FOOD":
        return { route: "/employee/lunch", icon: <FaBowlFood /> };
      case "CONV":
        return {
          route: "/employee/conference-room",
          icon: <GiVideoConference size={24} />,
        };
      case "LEAVE":
        return { route: "/employee/leave", icon: <MdTimeToLeave size={24} /> };
      default:
        return { route: "/employee/dashboard", icon: null };
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="">Dashboard</h2>

      {/* user profile card */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-lg w-20 h-20 bg-red-400 p-[2px]">
          <img
            src="https://images.pexels.com/photos/6999225/pexels-photo-6999225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={userDetails?.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 flex flex-col bg-gray-100 p-3">
          <p className="text-lg font-bold">
            Welcome,
            {userDetails?.name}
          </p>
          <p className="text-sm">Monday, 20th Feb 2024</p>
        </div>
      </div>

      {/* portals' cards display */}
      <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        {loading ? (
          <CardSkeleton />
        ) : (
          portals.map((portal, i) => (
            <Link to={portal.route} key={i}>
              <Card>
                <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
                  {portal.icon}
                </h5>
                <p className="font-normal ">{portal.name} Portal</p>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* 1st grid layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-secondaryColor">
        {/* left side */}
        {/* image */}
        <div className="w-full col-span-2 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:h-[300px] overflow-hidden">
          <img
            src="https://citinewsroom.com/wp-content/uploads/2021/11/CYBERTEQ1.jpeg"
            alt="portal homepage"
            className="object-cover w-full h-full"
          />
        </div>

        {/* right side */}
        <div className="space-y-6">
          <Card cardType="displayCard">
            <div className="flex justify-between w-full">
              {/* left */}
              <span className="text-center">
                <p className="text-lg">5</p>
                <p className="font-semibold text-sm">LEAVE TAKEN</p>
              </span>

              {/* line */}
              <div className="border-l border-gray-500 h-full mx-4"></div>

              {/* right */}
              <span className="text-center">
                <p className="text-lg">12</p>
                <p className="font-semibold text-sm">REMAINING</p>
              </span>
            </div>
          </Card>

          <Card cardType="imageCard">
            <img
              src="https://cdn.educba.com/academy/wp-content/uploads/2019/01/Combination-Charts-Example-2-6.png"
              alt="chart"
              className="w-full overflow-hidden"
            />
          </Card>
        </div>
      </div>

      {/* 2nd grid layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 w-full text-secondaryColor flex items-center gap-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4">
          <MdOutlineTimeToLeave size={24} />
          <p>YOUR ANNUAL LEAVE STARTS TOMORROW</p>
        </div>
        <Card cardType="textCard" className="row-span-1">
          HOLIDAY - 6TH MARCH
        </Card>
      </div>
    </div>
  );
}
