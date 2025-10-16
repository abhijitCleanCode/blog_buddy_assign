import { db } from "@/database/drizzle";
import { categories } from "@/database/schema";
import { generateSlug } from "@/lib/helper";
import { eq } from "drizzle-orm";

export class CategoryService {
  static async getAll() {
    return await db.select().from(categories);
  }

  static async create(data: { name: string; description: string }) {
    const slug = generateSlug(data.name);

    const [newCategory] = await db
      .insert(categories)
      .values({ name: data.name, slug, description: data.description })
      .returning();

    return newCategory;
  }

  static async update(data: { id: string; name?: string; description?: string }) {
    const updates: Record<string, any> = {};

    if (data.name) {
      updates.name = data.name;
      updates.slug = generateSlug(data.name);
    }

    if (data.description) {
      updates.description = data.description;
    }

    if (Object.keys(updates).length === 0) {
      throw new Error("No fields provided to update");
    }

    const [updated] = await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, data.id))
      .returning();

    return updated;
  }

  static async delete(id: string) {
    await db.delete(categories).where(eq(categories.id, id));
    return { success: true };
  }
}
