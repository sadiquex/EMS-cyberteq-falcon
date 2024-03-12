import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { FaBowlFood } from "react-icons/fa6";
import { GiVideoConference } from "react-icons/gi";
import { MdTimeToLeave } from "react-icons/md";
import Card from "./_ui/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardSkeleton } from "./_ui/Skeletons";

export default function Portals() {
  const [portals, setPortals] = useState([]);
  const [loading, setLoading] = useState();
  const userToken = localStorage.getItem("userToken");
  const { employmentType, role } = useSelector(
    (state) => state.user?.userDetails
  );

  useEffect(() => {
    const getPortals = async () => {
      setLoading(true);
      try {
        const response = await API.get("/Portal");

        // manually add route and portal icons
        const mappedPortals = response.data?.result.map((portal) => {
          return {
            ...portal,
            route: mapRouteAndIcon(portal.id).route,
            icon: mapRouteAndIcon(portal.id).icon,
          };
        });

        // set the portals according to employment type
        if (employmentType !== "FTIME") {
          setPortals(mappedPortals.slice(0, 2)); // show only the food and conference room
        } else {
          setPortals(mappedPortals); // show all portals
        }

        setLoading(false);
      } catch (error) {
        // console.error("error getting portals:", error);
        toast.error(error.result.data?.errorMessages);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getPortals();

    // cleanup fucntion
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [userToken]);

  // manually map portal IDs to routes and icons
  const mapRouteAndIcon = (portalId) => {
    // check if role is 'user', change it to 'employee'
    const adjustedRole = role === "user" ? "employee" : role;

    switch (portalId) {
      case "FOOD":
        return { route: `/${adjustedRole}/lunch`, icon: <FaBowlFood /> };
      case "CONV":
        return {
          route: `/${adjustedRole}/conference-room`,
          icon: <GiVideoConference size={24} />,
        };
      case "LEAVE":
        return {
          route: `/${adjustedRole}/leave`,
          icon: <MdTimeToLeave size={24} />,
        };
      default:
        return { route: `/${adjustedRole}/dashboard`, icon: null };
    }
  };

  return loading ? (
    <CardSkeleton />
  ) : (
    <div className=" md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4">
      {portals?.map((portal, i) => (
        <Link to={portal.route} key={i}>
          <Card>
            <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
              {portal.icon}
            </h5>
            <p className="font-normal ">{portal.name} Portal</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
