import {
  useMutation,
  UseMutationResult,
//   useQueryClient,
} from "@tanstack/react-query";
import { TProviderRequest } from "../_dto/provider-request";
import { resAuth } from "../_repo/resAuth";

export const useRequestProvider = (): UseMutationResult<
  { success: boolean },
  Error,
  TProviderRequest
> => {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resAuth.requestProvider,
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.error("error");
    },
  });
};
