import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TUpdateUsername } from "../_dto/update-user-profile";
import resUserAPI from "../_repository/resUser";
import User from "../../../(shared)/__entities/user";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";

export const useUpdateUsername = (): UseMutationResult<
  User,
  Error,
  TUpdateUsername
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resUserAPI.updateUsername,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
  });
};
