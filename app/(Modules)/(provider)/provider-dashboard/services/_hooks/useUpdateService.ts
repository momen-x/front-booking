import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import resService from "../_repo/resService";
import { TUpdateService } from "../_dto/update-service";
import Service from "@/app/(Modules)/(public)/services/_entity/service";
import { SERVICES_KEY } from "./useGetProviderServices";

export const useUpdateService = (): UseMutationResult<
  Service,
  Error,
  { id: string; data: TUpdateService }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => resService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SERVICES_KEY],
      });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
};
