import z from "zod";

export const updateUsername = z.object({
  username: z.string().min(5),
});

export type TUpdateUsername = z.infer<typeof updateUsername>;
