import API from "../api/axios";
import { toast } from "react-toastify";
import { FaBowlFood } from "react-icons/fa6";
import { GiVideoConference } from "react-icons/gi";
import { MdTimeToLeave } from "react-icons/md";
import Card from "./_ui/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardSkeleton } from "./_ui/Skeletons";
import { useQuery } from "@tanstack/react-query";

const usePortals = () => {
  // fetch portals data using react query
  return useQuery({
    queryKey: ["portals"],
    queryFn: async () => {
      try {
        const response = await API.get("/Portal");
        if (response.status === 200) {
          return response.data?.result;
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error.message + " getting portals");
      }
    },
  });
};

export default function Portals() {
  const { data: portals, isLoading, error, refetch } = usePortals();
  const { role } = useSelector((state) => state.user?.userDetails);

  // manually map portal IDs to routes and icons
  const mapRouteAndIcon = (portalId) => {
    // check if role is 'user', change it to 'employee' to enable correct routing
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

  return isLoading ? (
    <div className="md:max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((num, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <div className="w-full flex justify-between flex-wrap gap-4">
      {portals?.map((portal, i) => (
        <Link to={mapRouteAndIcon(portal.id).route} key={i}>
          <Card>
            <h5 className="mb-2 text-3xl font-bold tracking-tight  ">
              {mapRouteAndIcon(portal.id).icon}
            </h5>
            <p className="font-normal">{portal.name} Portal</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
