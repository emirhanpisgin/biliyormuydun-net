import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const categories = pgTable("category", {
	name: text("name").notNull().unique(),
	creatorId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "no action" }),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const categoryRelations = relations(categories, ({ one }) => ({
	creator: one(users, {
		fields: [categories.creatorId],
		references: [users.id],
	}),
}));
