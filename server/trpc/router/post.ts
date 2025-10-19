import { publicProcedure, router } from "../trpc";
import { createPostSchema } from "@/server/validation/post";
import { PostService } from "@/server/services/post.service";
import * as z from "zod";

export const postRouter = router({
  getAll: publicProcedure
    .input(
      z
        .object({
          published: z.boolean().optional(),
          categoryId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const { published, categoryId } = input || {};
      return await PostService.getAll(published, categoryId);
    }),

  create: publicProcedure
    .input(createPostSchema)
    .mutation(({ input }) => PostService.create(input)),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => PostService.delete(input.id)),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => PostService.getById(input.id)),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(3),
      content: z.string().min(10),
      published: z.boolean().optional(),
      categoryIds: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      return await PostService.update(input);
    }),

});
