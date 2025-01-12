import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sessions } from "./sessions";
import { authenticators } from "./authenticators";
import { accounts } from "./accounts";

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
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	authenticators: many(authenticators),
    accounts: many(accounts),
}));
