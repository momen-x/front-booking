import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "../_repo/resAuth";

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
      success();
    },
    onError: (error) => {
      console.error("Error response:", error); // Check error details
      onError(error);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
