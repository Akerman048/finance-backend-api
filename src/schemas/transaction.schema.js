import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense"]),
  category: z.string().trim().min(1, "Category is required"),
  date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date",
  }),
});

export const updateTransactionSchema = createTransactionSchema.partial();
