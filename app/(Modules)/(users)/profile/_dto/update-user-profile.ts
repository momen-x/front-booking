import z from "zod";

export const uploadUserImage = z.object({
  user_image: z
    .instanceof(File, { message: "The image is required" })
    .optional()
    .nullable(),
});
export const updateUsername = z.object({
  username: z.string().min(5).max(35),
});
export const updatePassword = z
  .object({
    oldPassword: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TUploadUserImage = z.infer<typeof uploadUserImage>;
export type TUpdateUsername = z.infer<typeof updateUsername>;
export type TUpdatePassword = z.infer<typeof updatePassword>;
