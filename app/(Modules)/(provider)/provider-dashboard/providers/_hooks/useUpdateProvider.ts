import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TUpdateProvider } from "../_dto/update-provider";
import resProvider from "../_repository/resProvider";
import Provider from "../../../../(shared)/__entities/provider";

export const useUpdateProvider = (
  id?: string,
): UseMutationResult<Provider, Error, TUpdateProvider> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: TUpdateProvider) => resProvider.update(dto, id),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["provider"] });
    },
    onError: (error) => {
      console.error("Error response:", error);
    },
  });
};
