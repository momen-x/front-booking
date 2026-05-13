import { z } from "zod";

// create-booking.dto.ts
export const createBookingSchema = z.object({
  providerId: z.string(),
  serviceId: z.string(),
  date: z.string().min(1),
  startTime: z.number(), // ← number, not string
  // endTime: z.number(), // ← number, not string
});

export type TCreateBooking = z.infer<typeof createBookingSchema>;

// Converts availability minutes + selected date → ISO string
// e.g. minutes=540, date="2026-05-10" → "2026-05-10T09:00:00.000Z"
export function minutesToISOString(minutes: number, date: string): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return new Date(`${date}T${h}:${m}:00`).toISOString();
}
