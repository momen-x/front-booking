import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import resService from "../_repo/resService";
import { TService } from "../../../(provider)/services/_dto/add-service";
import Service from "@/app/(Modules)/(public)/services/_entity/service";

export const useCreateService = (): UseMutationResult<
  Service,
  Error,
  TService
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
};
