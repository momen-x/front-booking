import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TLogin } from "../_dto/login";
import { resAuth } from "../_repo/resAuth";


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
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
