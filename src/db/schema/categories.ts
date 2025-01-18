import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { User, users } from "./users";
import { relations } from "drizzle-orm";

export const categories = pgTable("category", {
	name: text("name").notNull().unique().primaryKey(),
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

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdateCategory = Omit<NewCategory, "id">;

export type CategoryWithCreator = Category & {
    creator: User;
}

// TODO - Add post count to category schema