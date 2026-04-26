import z from "zod";

export const registerForm = z
  .object({
    email: z.email(),
    username: z.string().min(3),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegisterForm = z.infer<typeof registerForm>;

export const registerSchema = {
  email: z.email(),
  username: z.string().min(3),
  password: z.string().min(8),
};
export type TRegisterSchema = z.infer<typeof registerSchema>;
