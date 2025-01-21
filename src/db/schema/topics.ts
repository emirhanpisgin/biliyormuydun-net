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
	writerId: text("writerId").references(() => users.id, { onDelete: "set null" }),
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
	}),
	writer: one(users, {
		fields: [topics.writerId],
		references: [users.id],
	}),
}));

export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
export type UpdateTopic = Omit<NewTopic, "id">;
export type TopicWithRelations = Topic & {
	category: Category;
	author: User;
	writer: User;
};
