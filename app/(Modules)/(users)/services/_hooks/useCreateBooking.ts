import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import BookingPayload from "../../../(shared)/__entities/booking-payload";
import { TCreateBooking } from "../_dto/create-booking";
import { resBooking } from "../_repository/resBooking";

export const BOOKING_KEY = "booking";

export const useCreateBooking = (): UseMutationResult<
  BookingPayload,
  Error,
  TCreateBooking
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resBooking.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BOOKING_KEY],
      });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
};
