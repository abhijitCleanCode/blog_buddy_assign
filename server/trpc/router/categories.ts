import { router, publicProcedure } from "@/server/trpc/trpc";
import { z } from "zod";
import { db } from "@/database/drizzle"
import { categories } from "@/database/schema";
import { eq } from "drizzle-orm";

export const categoriesRouter = router({
    // get all categories
    getAll: publicProcedure.query(async () => {
        return await db.select().from(categories);
    })
})
