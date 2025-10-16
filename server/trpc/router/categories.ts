import { router, publicProcedure } from "@/server/trpc/trpc";
import { z } from "zod";
import { db } from "@/database/drizzle"
import { categories } from "@/database/schema";
import { eq } from "drizzle-orm";
import { CategoryService } from "@/server/services/category.service";
import { createCategorySchema } from "@/server/validation/category";

export const categoriesRouter = router({
    // get all categories
    getAll: publicProcedure.query(CategoryService.getAll),

    create: publicProcedure.input(createCategorySchema).mutation(async ({ input }) => CategoryService.create(input)),

    delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => CategoryService.delete(input.id)),
})
