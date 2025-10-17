import {pgTable, uuid, varchar, text, boolean, timestamp} from "drizzle-orm/pg-core"
import { postCategories } from "./postCategories";
import { relations } from "drizzle-orm";

export const posts = pgTable("posts", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: text("text").notNull(),
    published: boolean("published").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const postsRelations = relations(posts, ({ many }) => ({
  postCategories: many(postCategories),
}));
