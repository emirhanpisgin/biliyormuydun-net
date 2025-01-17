import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sessions } from "./sessions";
import { authenticators } from "./authenticators";
import { accounts } from "./accounts";
import { categories } from "./categories";

export const roleEnum = pgEnum("role", ["member", "admin"]);

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	nameChangedAt: timestamp("nameChangedAt", { mode: "date" }),
	username: text("username").unique(),
	usernameChangedAt: timestamp("usernameChangedAt", { mode: "date" }),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	imageChangedAt: timestamp("imageChangedAt", { mode: "date" }),
    role: roleEnum("role").$default(() => "member"),
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	authenticators: many(authenticators),
    accounts: many(accounts),
    categories: many(categories),
}));

export type User = typeof users.$inferSelect;
export type UpdateUser = Omit<typeof users.$inferInsert, "id">;