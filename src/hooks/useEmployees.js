// get all employees

import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";
import { toast } from "react-toastify";

const useEmployees = () => {
  // Fetch employees data using React Query
  const {
    isLoading,
    error,
    data: employees,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const response = await API.get(`/Users`);

        if (response.status === 200) {
          return response.data?.result;
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error.message + " getting employees");
      }
    },
  });
  return { isLoading, error, employees, refetch };
};

export default useEmployees;
