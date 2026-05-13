import z from "zod";

export const createProviderSchema = z.object({
  userId: z.string().min(5),
  businessName: z.string().min(5),
  description: z.string().min(5).or(z.literal("")).optional(),
  location: z.string().min(5).or(z.literal("")).optional(),
});

export type TCreateProvider = z.infer<typeof createProviderSchema>;
