import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TCreateProvider } from "../_dto/create-provider";
import resProvider from "../_repo/resProvider";
import Provider from "@/app/(Modules)/(public)/providers/entities/provider";

export const useCreateProvider = (): UseMutationResult<
  Provider,
  Error,
  TCreateProvider
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resProvider.create,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
    onError: (error) => {
      console.error("Error response:", error);
    },
  });
};
