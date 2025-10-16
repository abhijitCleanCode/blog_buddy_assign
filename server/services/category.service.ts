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

  static async delete(id: string) {
    await db.delete(categories).where(eq(categories.id, id));
    return {success: true};
  }
}
