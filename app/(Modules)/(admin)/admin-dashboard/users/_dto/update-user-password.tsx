import z from "zod";

export const updateUserPassword = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type TUpdateUserPassword = z.infer<typeof updateUserPassword>;
