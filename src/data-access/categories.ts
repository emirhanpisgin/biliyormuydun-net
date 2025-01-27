import { database } from "@/db";
import { categories } from "@/db/schema";

export async function getCategories() {
    return await database.query.categories.findMany();
}

export async function createCategory(name: string) {
	await database.insert(categories).values({
		name,
	});
}
