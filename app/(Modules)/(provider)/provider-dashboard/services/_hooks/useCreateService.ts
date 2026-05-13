import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import resService from "../_repo/resService";
import { TService } from "../_dto/add-service";
import Service from "@/app/(Modules)/(shared)/__entities/service";
import { SERVICES_KEY } from "./useGetProviderServices";

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
        queryKey: [SERVICES_KEY],
      });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
};
