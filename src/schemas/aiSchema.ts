import { z } from "zod";

export const aiRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Enter a request with at least 20 characters.")
    .max(2000, "Keep your request to 2000 characters or fewer."),
});

export type AiRequestFormValues = z.infer<typeof aiRequestSchema>;
