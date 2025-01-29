import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories, Category } from "./categories";
import { User, users } from "./users";
import { relations } from "drizzle-orm";

export const topics = pgTable("topic", {
	id: uuid().primaryKey().defaultRandom(),
	slug: text().unique().notNull(),
	title: text().notNull(),
	content: text(),
	categoryId: text().references(() => categories.id, { onDelete: "set null" }),
	createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
	authorId: text().references(() => users.id, { onDelete: "set null" }),
	editorId: text().references(() => users.id, { onDelete: "set null" }),
	sources: text().array().notNull().default([]),
});

export const topicRelations = relations(topics, ({ one }) => ({
	category: one(categories, {
		fields: [topics.categoryId],
		references: [categories.id],
	}),
	author: one(users, {
		fields: [topics.authorId],
		references: [users.id],
        relationName: "author",
	}),
	editor: one(users, {
		fields: [topics.editorId],
		references: [users.id],
        relationName: "editor",
	}),
}));

export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
export type UpdateTopic = Omit<NewTopic, "id">;
export type TopicWithRelations = Topic & {
	category: Category | null;
	author: User | null;
	editor: User | null;
};
