import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { User, users } from "./users";
import { relations } from "drizzle-orm";
import { Topic, topics } from "./topics";

export const categories = pgTable("category", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	authorId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "no action" }),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const categoryRelations = relations(categories, ({ one, many }) => ({
	author: one(users, {
		fields: [categories.authorId],
		references: [users.id],
	}),
	topics: many(topics),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdateCategory = Omit<NewCategory, "id">;
export type CategoryWithRelations = Category & {
	author: User | null;
	topics: Topic[];
};

// TODO - Add post count to category schema
