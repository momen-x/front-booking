import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "../_repo/resAuth";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";

export const useLogout = (
  success: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void,
): UseMutationResult<{ success: boolean }, Error> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resAuth.logout,
    onSuccess: () => {
      console.log("success");
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], null);
      // queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      success();
    },
    onError: (error) => {
      console.error("Error response:", error); // Check error details
      onError(error);
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
  });
};
