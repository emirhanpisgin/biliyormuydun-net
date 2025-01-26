import { sql, Table } from "drizzle-orm";

import { database, Database } from "@/db";
import * as schema from "@/db/schema/index";
import * as seeds from "@/db/seeds";

async function resetTable(db: Database, table: Table) {
	return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
	for (const table of [
		schema.categories,
        schema.topics
	]) {
		await resetTable(database, table);
	}
	await seeds.categories(database);
    await seeds.topics(database);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Seeding done!");
		process.exit(0);
	});