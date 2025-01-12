import { database } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function usernameExists(username: string) {
    const user = await database.query.users.findFirst({
        where: eq(users.username, username)
    });

    return !!user;
}