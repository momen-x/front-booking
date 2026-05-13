/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { resAuth } from "../_repo/resAuth";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";
import User from "../../(shared)/__entities/user";

export const useCurrentUser = () => {
  return useQuery<User | null, Error>({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: async () => {
      try {
        const user = await resAuth.getCurrentUser();
        return user; // User
      } catch (error: any) {
        // If unauthorized → treat as NOT logged in
        if (error?.response?.status === 401) {
          return null;
        }
        throw error; // real error
      }
    },
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false, // ⚠️ important
  });
};
