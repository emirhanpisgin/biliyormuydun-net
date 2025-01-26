"use server";
import { database } from "@/db";

export async function getCategories() {
	return await database.query.categories.findMany();
}
