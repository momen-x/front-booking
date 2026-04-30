import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TUpdatePassword } from "../_dto/update-user-profile";
import resUserAPI from "../_repository/resUser";
import User from "../../_entity/user";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";

export const useUpdatePassword = (): UseMutationResult<
  User,
  Error,
  TUpdatePassword
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resUserAPI.updatePassword,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
  });
};
