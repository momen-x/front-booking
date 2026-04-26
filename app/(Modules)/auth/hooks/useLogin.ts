import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "@/app/(Modules)/auth/repo/resAuth";
import { TLogin } from "@/app/(Modules)/auth/dto/login";

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
