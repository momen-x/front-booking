import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TUpdateProvider } from "../_dto/update-provider";
import resProvider from "../_repository/resProvider";
import Provider from "../entity/provider";

export const useUpdateProvider = (): UseMutationResult<
  Provider,
  Error,
  TUpdateProvider
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resProvider.update,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["provider"] });
    },
    onError: (error) => {
      console.error("Error response:", error);
    },
  });
};
