import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { categories, Category } from "./categories";
import { User, users } from "./users";
import { relations } from "drizzle-orm";

export const topics = pgTable("topic", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	slug: text("slug").unique().notNull(),
	title: text("title").notNull(),
	content: text("content"),
	categoryId: text("categoryId").references(() => categories.id, { onDelete: "set null" }),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
	authorId: text("authorId").references(() => users.id, { onDelete: "set null" }),
	editorId: text("editorId").references(() => users.id, { onDelete: "set null" }),
	sources: text("sources").array().notNull().default([]),
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
	category: Category;
	author: User;
	editor: User;
};
