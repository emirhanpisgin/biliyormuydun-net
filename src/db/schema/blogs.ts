import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories, Category } from "./categories";
import { User, users } from "./users";
import { relations } from "drizzle-orm";
import { Topic, topics } from "./topics";

export const blogStatusEnum = pgEnum("blogStatus", ["hidden", "pending", "published"]);

export const blogs = pgTable("blog", {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    slug: text().unique().notNull(),
    content: text(),
    bannerUrl: text().notNull(),
    status: blogStatusEnum().$default(() => "hidden"),
    categoryId: uuid()
        .notNull()
        .references(() => categories.id, { onDelete: "restrict" }),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
    authorId: uuid()
        .notNull()
        .references(() => users.id, { onDelete: "restrict" }),
});

export const blogRelations = relations(blogs, ({ one }) => ({
    category: one(categories, {
        fields: [blogs.categoryId],
        references: [categories.id],
    }),
    author: one(users, {
        fields: [blogs.authorId],
        references: [users.id],
    }),
    topic: one(topics),
}));

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type UpdateBlog = Omit<NewBlog, "id">;
export type BlogWithRelations = Blog & {
    category: Category;
    author: User;
    topic: Topic | null;
};
