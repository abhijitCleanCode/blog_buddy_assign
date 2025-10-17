import { router } from "@/server/trpc/trpc";
import {categoriesRouter} from "@/server/trpc/router/categories";
import { postRouter } from "./post";

// sub-router imports

// root application router
export const appRouter = router({
    categories: categoriesRouter,
    post: postRouter,
});

// export type definition of api
export type AppRouter = typeof appRouter;
