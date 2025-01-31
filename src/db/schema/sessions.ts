import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const sessions = pgTable("session", {
    sessionToken: text().primaryKey(),
    userId: uuid()
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp({ mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));
