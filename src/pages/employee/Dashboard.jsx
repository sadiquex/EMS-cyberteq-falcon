import Card from "../../components/_ui/Card";
import { FaBowlFood } from "react-icons/fa6";
import { GiVideoConference } from "react-icons/gi";
import { MdTimeToLeave } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Dashboard() {
  const userDetails = useSelector((state) => state.user.userDetails);
  const { name } = userDetails;
  const [portals, setPortals] = useState([]);

  useEffect(() => {
    axios
      .get("/Portal")
      .then((response) => {
        // manually add route and portal icons
        const mappedPortals = response.data.result.map((portal) => {
          return {
            ...portal,
            route: mapRouteAndIcon(portal.id).route,
            icon: mapRouteAndIcon(portal.id).icon,
          };
        });

        setPortals(mappedPortals);
      })
      .catch((err) => console.error(err));

    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

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
      <h2 className="font-large">Home Dashboard</h2>

      {/* user profile card */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-lg w-20 h-20 bg-red-400 p-[2px]">
          <img
            src="https://images.pexels.com/photos/6999225/pexels-photo-6999225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 flex flex-col bg-gray-200 p-3">
          <p className="text-lg font-bold">
            Welcome,
            {name}
          </p>
          <p className="text-sm">Monday, 20th Feb 2024</p>
        </div>
      </div>

      {/* portals' cards display */}
      <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        {portals.map((portal, i) => (
          <Link to={portal.route} key={i}>
            <Card cardType="portal">
              <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
                {portal.icon}
              </h5>
              <p className="font-normal ">{portal.name} Portal</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* image */}
      <div className="w-full bg-red-300 md:h-[400px] p-1 rounded-lg">
        <img
          src="https://images.pexels.com/photos/296115/pexels-photo-296115.jpeg"
          alt="portal homepage"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
