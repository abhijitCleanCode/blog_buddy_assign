import * as z from "zod";

export const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    published: z.boolean().optional(),
    categoryIds: z.array(z.string().uuid()).nonempty(),
})
