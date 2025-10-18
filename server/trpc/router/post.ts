import { publicProcedure, router } from "../trpc";
import { createPostSchema } from "@/server/validation/post";
import { PostService } from "@/server/services/post.service";
import * as z from "zod";

export const postRouter = router({
  getAll: publicProcedure.query(() => PostService.getAll()),

  create: publicProcedure
    .input(createPostSchema)
    .mutation(({ input }) => PostService.create(input)),

    delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => PostService.delete(input.id)),

    getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => PostService.getById(input.id)),
});
