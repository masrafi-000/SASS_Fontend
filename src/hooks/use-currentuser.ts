import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        console.log("Fetching current user from:", api.defaults.baseURL);
        const response = await api.get("/auth/current-user");
        console.log("User data received:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching current user:", error);
        // Return null for any error - the component will handle it appropriately
        return null;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { isLoading, isError, user, error };
};
