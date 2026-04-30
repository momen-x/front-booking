import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TLogin } from "../_dto/login";
import { resAuth } from "../_repo/resAuth";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";

export const useLogin = (): UseMutationResult<
  { success: boolean },
  Error,
  TLogin
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resAuth.login,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Error response:", error);
    },
  });
};
