import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import resService from "../_repo/resService";
import { TUpdateService } from "../_dto/update-service";
import Service from "../_entity/service";

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
        queryKey: ["services"],
      });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
};
