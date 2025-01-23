"use server";
import { database } from "@/db";

export async function getCategoriesWithRelations() {
    return await database.query.categories.findMany({
        with: {
            author: true,
            topics: true,
        }
    });
}