import { toast } from "react-toastify";
import API from "../api/axios";
import { useQuery } from "@tanstack/react-query";

const useUserData = (id) => {
  const {
    isLoading: userDataLoading,
    isError: userDataError,
    data: userData,
  } = useQuery({
    queryKey: ["userData", id], // query for only that current user
    queryFn: async () => {
      const response = await API.get(`/Users/user-profile/${id}`);
      return response.data?.result;
    },
    enabled: !!id,
    onError: (error) => {
      toast.error(error);
    },
  });

  return { userDataLoading, userDataError, userData };
};

export default useUserData;
