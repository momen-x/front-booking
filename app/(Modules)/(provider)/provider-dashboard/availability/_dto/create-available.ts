import { z } from "zod";

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const createAvailabilitySchema = z
  .object({
    dayOfWeek: z.coerce.number().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "Required"),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "Required"),
  })
  .refine((d) => timeToMinutes(d.startTime) < timeToMinutes(d.endTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export type TCreateAvailability = z.infer<typeof createAvailabilitySchema>;

// Helper used in the hook to convert before sending to API
export { timeToMinutes };