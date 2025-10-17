import { pgTable, uuid } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { categories } from "./categories";
import { relations } from "drizzle-orm";

export const postCategories = pgTable("post_categories", {
    postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" })
})

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));
