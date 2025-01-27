import { database } from "@/db";
import { NewTopic, topics } from "@/db/schema/topics";
import { eq } from "drizzle-orm";

export async function getTopicsWithRelations() {
	return await database.query.topics.findMany({
		with: {
			author: true,
			category: true,
			editor: true,
		},
	});
}

export async function createTopic(data: NewTopic) {
	await database.insert(topics).values(data);
}

export async function deleteTopic(id: string) {
	await database.delete(topics).where(eq(topics.id, id));
}
