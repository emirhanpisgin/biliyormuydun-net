import { boolean, integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text().notNull().unique(),
        userId: uuid()
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text().notNull(),
        credentialPublicKey: text().notNull(),
        counter: integer().notNull(),
        credentialDeviceType: text().notNull(),
        credentialBackedUp: boolean().notNull(),
        transports: text(),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
);

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
    user: one(users, {
        fields: [authenticators.userId],
        references: [users.id],
    }),
}));
