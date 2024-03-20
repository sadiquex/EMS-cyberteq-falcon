// used my Manager and Admin to see who has applied for leaves

import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";
import { toast } from "react-toastify";

const useLeavesData = () => {
  // GET applied leaves using React Query
  const {
    isLoading: loadingLeavesData,
    isError: leavesDataError,
    data: leavesData,
  } = useQuery({
    queryKey: ["leavesData"],
    queryFn: async () => {
      try {
        const response = await API.get(`/LeaveRequest`);

        if (response.status === 200) {
          // Check if response data is an empty array
          if (
            Array.isArray(response.data.result) &&
            response.data.result.length === 0
          ) {
            return []; // Return an empty array
          } else {
            return response.data.result;
          }
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error.message + " getting leaves");
      }
    },
  });

  return {
    loadingLeavesData,
    leavesData,
    leavesDataError,
  };
};

export default useLeavesData;
