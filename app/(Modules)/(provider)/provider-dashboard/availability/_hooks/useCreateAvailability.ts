import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateAvailability, timeToMinutes } from "../_dto/create-available";

const createAvailability = async (data: TCreateAvailability) => {
  const response = await fetch("http://localhost:5000/api/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      dayOfWeek: data.dayOfWeek,
      startTime: timeToMinutes(data.startTime),
      endTime: timeToMinutes(data.endTime),
    }),
  });

  if (!response.ok) throw await response.json();
  return response.json();
};

export const useCreateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
};
