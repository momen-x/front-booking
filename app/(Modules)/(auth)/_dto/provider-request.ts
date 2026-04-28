import z from "zod";

export const providerRequestSchema = z.object({
  provideName: z.string().min(1, "Provider name is required"),
  IDNumber: z.string().min(1, "ID Number is required"),
  fullName: z.string().min(1, "Full name is required"),
  birthday: z
    .union([z.date(), z.string().transform((val) => new Date(val))])
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date of birth is required",
    }),
  nationality: z.string().min(1, "Nationality is required"),
  location: z.string().min(1, "Location is required"),
  IDImage: z.instanceof(File, { message: "ID document is required" }).optional().nullable(),
  selfieIDImage: z.instanceof(File, { message: "Selfie with ID is required" }).optional().nullable(),
  Portfolio: z.array(z.instanceof(File)).optional(),
});

export type TProviderRequest = z.infer<typeof providerRequestSchema>;
