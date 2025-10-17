import * as z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
});
