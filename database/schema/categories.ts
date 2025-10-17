import { relations } from "drizzle-orm";
import {pgTable, uuid, varchar, text, timestamp} from "drizzle-orm/pg-core";
import { postCategories } from "./postCategories";

export const categories = pgTable("categories", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", {length: 255}).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  postCategories: many(postCategories),
}));
