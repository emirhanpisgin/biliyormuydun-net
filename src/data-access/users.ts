import { database } from "@/db";
import { UpdateUser, users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function updateUser(userId: string, newData: UpdateUser) {
    await database.update(users).set(newData).where(eq(users.id, userId));
}