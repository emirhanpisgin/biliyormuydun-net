import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories, Category } from "./categories";
import { User, users } from "./users";
import { relations } from "drizzle-orm";
import { blogs } from "./blogs";

export const topics = pgTable("topic", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    slug: text().unique().notNull(),
    title: text().notNull(),
    content: text(),
    categoryId: uuid()
        .notNull()
        .references(() => categories.id, { onDelete: "restrict" }),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
    authorId: uuid()
        .notNull()
        .references(() => users.id, { onDelete: "restrict" }),
    editorId: uuid().references(() => users.id, { onDelete: "restrict" }),
    sources: text().array().notNull().default([]),
    blogId: uuid().references(() => blogs.id, { onDelete: "restrict" }),
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
    blog: one(blogs, {
        fields: [topics.blogId],
        references: [blogs.id],
    }),
}));

export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
export type UpdateTopic = Omit<NewTopic, "id">;
export type TopicWithRelations = Topic & {
    category: Category;
    author: User;
    editor: User | null;
};
