import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import resUser from "../_repo/resUser";
import User from "@/app/(Modules)/(users)/_entity/user";

export const useUpdateUserUsername = (
  userId: string,
): UseMutationResult<User, Error, { username: string }> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username }) => resUser.updateUsername(userId, username),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error response:", error);
    },
  });
};
