import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import resUserAPI from "../_repository/resUser";
import { CURRENT_USER_QUERY_KEY } from "@/app/utils/constance";
import User from "../../../(shared)/__entities/user";

export const useDeleteUserImage = (): UseMutationResult<User, Error> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resUserAPI.deleteUserImage,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
  });
};
