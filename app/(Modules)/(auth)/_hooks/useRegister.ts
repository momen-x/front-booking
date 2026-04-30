import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TRegisterSchema } from "../_dto/register";
import { resAuth } from "../_repo/resAuth";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";

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
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
  });
};
