import { faker } from "@faker-js/faker";
import { Database, database } from "..";
import { NewTopic, topics } from "../schema/topics";
import { slugify } from "@/lib/utils";

const mock = async () => {
	const [usersData, categoriesData] = await Promise.all([
		database.query.users.findMany(),
		database.query.categories.findMany(),
	]);

	const data: NewTopic[] = [];

	for (let i = 0; i < 100; i++) {
        const topicTitle = faker.lorem.words(10);

		data.push({
			title: topicTitle,
            slug: slugify(topicTitle),
			content: faker.lorem.words({ min: -1, max: 15 }),
            authorId: faker.helpers.arrayElement(usersData).id,
			categoryId: faker.helpers.arrayElement(categoriesData).id,
            sources: ["https://www.example.com"],
            createdAt: faker.date.recent(),
		});
	}

	return data;
};

export async function seed(db: Database) {
	const insertData = await mock();
	await db.insert(topics).values(insertData);
}