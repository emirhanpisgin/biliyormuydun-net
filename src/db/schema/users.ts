import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sessions } from "./sessions";
import { authenticators } from "./authenticators";
import { accounts } from "./accounts";
import { Topic, topics } from "./topics";
import { blogs } from "./blogs";

export const roleEnum = pgEnum("role", ["admin", "moderator", "author", "researcher", "member"]);

export const users = pgTable("user", {
    id: uuid().primaryKey().defaultRandom(),
    name: text(),
    nameChangedAt: timestamp({ mode: "date" }),
    username: text().unique(),
    usernameChangedAt: timestamp({ mode: "date" }),
    email: text().unique(),
    emailVerified: timestamp({ mode: "date" }),
    image: text(),
    imageChangedAt: timestamp({ mode: "date" }),
    role: roleEnum().$default(() => "member"),
});

export const usersRelations = relations(users, ({ many, one }) => ({
    sessions: many(sessions),
    authenticators: many(authenticators),
    accounts: many(accounts),
    topics: many(topics, {
        relationName: "author",
    }),
    assignedTopic: one(topics, {
        fields: [users.id],
        references: [topics.editorId],
        relationName: "editor",
    }),
    blogs: many(blogs),
}));

export type User = typeof users.$inferSelect;
export type UpdateUser = Omit<typeof users.$inferInsert, "id">;
export type NewUser = Omit<UpdateUser, "role">;
export type UserWithRelations = User & {
    topics: Topic[];
    assignedTopic: Topic | null;
};
