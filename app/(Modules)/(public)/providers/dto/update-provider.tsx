import z from "zod";

export const updateProviderSchema = z.object({
  businessName: z.string().min(5).optional(),
  //   isActive: boolean;
  description: z.string().optional(),
  location: z.string().optional(),
});

export type TUpdateProvider = z.infer<typeof updateProviderSchema>;
