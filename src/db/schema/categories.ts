import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Topic, topics } from "./topics";

export const categories = pgTable("category", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
	topics: many(topics),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdateCategory = Omit<NewCategory, "id">;
export type CategoryWithRelations = Category & {
	topics: Topic[];
};

// TODO - Add post count to category schema
