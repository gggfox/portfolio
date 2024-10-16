import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name cant exceed 64 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});
