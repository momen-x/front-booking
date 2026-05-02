import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  duration: z.coerce
    .number()
    .positive()
    .min(10, "Duration must be at least 10 minutes"),

  price: z.coerce.number().positive().min(0.01, "Price must be at least $0.01"),
  images: z.array(z.instanceof(File)).optional(), // Use instanceof File
});

export type TService = z.infer<typeof serviceSchema>;
