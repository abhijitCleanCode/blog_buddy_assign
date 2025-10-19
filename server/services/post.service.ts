import { db } from "@/database/drizzle";
import { categories, posts } from "@/database/schema";
import { postCategories } from "@/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { generateSlug } from "@/lib/helper";
import * as z from "zod";

export class PostService {
    static async create(input: {
        title: string;
        content: string;
        published?: boolean;
        categoryIds: string[];
    }) {
        const slug = generateSlug(input.title);

        const [post] = await db
            .insert(posts)
            .values({
                title: input.title,
                slug,
                content: input.content,
                published: input.published ?? false,
            })
            .returning();

        if (!post) throw new Error("Post creation failed");

        // Link post to categories
        if (input.categoryIds.length > 0) {
            const links = input.categoryIds.map((categoryId) => ({
                postId: post.id,
                categoryId,
            }));
            await db.insert(postCategories).values(links);
        }

        return post;
    }

    static async getAll(published?: boolean, categoryId?: string) {
        // Build filters dynamically
        const whereClauses = [];

        if (typeof published === "boolean") {
            whereClauses.push(eq(posts.published, published));
        }

        if (categoryId) {
            whereClauses.push(
                inArray(
                    posts.id,
                    db
                        .select({ postId: postCategories.postId })
                        .from(postCategories)
                        .where(eq(postCategories.categoryId, categoryId))
                )
            );
        }

        const result = await db.query.posts.findMany({
            where: and(...whereClauses),
            with: {
                postCategories: {
                    with: { category: true },
                },
            },
            orderBy: (posts, { desc }) => [desc(posts.createdAt)], // newest first
        });

        return result;
    }


    static async delete(id: string) {
        const [deleted] = await db
            .delete(posts)
            .where(eq(posts.id, id))
            .returning();

        return deleted;
    }

    static async getById(id: string) {
        console.log("get by id :: ", id);

        const post = await db.query.posts.findFirst({
            where: eq(posts.id, id),
            with: {
                postCategories: { with: { category: true } },
            }
        });

        if (!post) return null;

        return {
            ...post,
            categories: post.postCategories.map((pc) => pc.category),
        }
    }

    static async update(input: {
        id: string;
        title: string;
        content: string;
        published?: boolean;
        categoryIds: string[];
    }) {
        const slug = generateSlug(input.title);

        const [updatedPost] = await db
            .update(posts)
            .set({
                title: input.title,
                slug,
                content: input.content,
                published: input.published ?? false,
            })
            .where(eq(posts.id, input.id))
            .returning();

        if (!updatedPost) throw new Error("Post update failed");

        // Update category relations
        await db.delete(postCategories).where(eq(postCategories.postId, input.id));

        if (input.categoryIds.length > 0) {
            const links = input.categoryIds.map((categoryId) => ({
                postId: input.id,
                categoryId,
            }));
            await db.insert(postCategories).values(links);
        }

        return updatedPost;
    }
}
