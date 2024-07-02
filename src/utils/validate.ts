import { z } from "zod";

export const schema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(50, "Title must be at most 50 characters"),
    message: z
      .string()
      .min(1, "Message is required")
      .max(300, "Message must be at most 300 characters"),
      datetime: z
      .string()
      .refine((value) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value), {
        message: "Date time with correct format is required (YYYY-MM-DD HH:mm:ss)",
      }),
  });