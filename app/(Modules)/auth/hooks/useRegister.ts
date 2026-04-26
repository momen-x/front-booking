import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "@/app/(Modules)/auth/repo/resAuth";
import { TRegisterSchema } from "@/app/(Modules)/auth/dto/register";

export const useRegister = (): UseMutationResult<
  { success: boolean },
  Error,
  TRegisterSchema
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resAuth.register,
    onSuccess: () => {
        console.log("success");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
