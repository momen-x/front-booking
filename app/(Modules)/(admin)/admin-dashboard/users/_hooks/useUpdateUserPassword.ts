import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TUpdateUserPassword } from "../_dto/update-user-password";
import resUser from "../_repo/resUser";
import User from "@/app/(Modules)/(users)/_entity/user";

export const useUpdateUserPassword = (): UseMutationResult<
  User,
  Error,
  TUpdateUserPassword
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resUser.updatePassword,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error response:", error);
    },
  });
};
