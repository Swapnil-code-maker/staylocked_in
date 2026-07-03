import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters."),

  email: z
    .string()
    .email("Enter a valid email address."),

  dateOfBirth: z.string().min(1, "Date of birth is required."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});

export type RegisterFormData = z.infer<
  typeof registerSchema
>;