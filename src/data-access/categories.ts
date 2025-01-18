import { database } from "@/db";
import { categories } from "@/db/schema";

export async function createCategory(name: string, userId: string) {
	await database.insert(categories).values({
		name,
		creatorId: userId,
	});
}
