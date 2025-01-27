"use server";

import { database } from "@/db";
import { categories } from "@/db/schema";
import { authenticatedAction } from "@/lib/safe-action";
import { createCategoryUseCase } from "@/use-cases/categories";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addCategoryAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.handler(async ({ ctx, input: userInput }) => {
		try {
			const input = userInput.trim();

			const category = await database.query.categories.findFirst({
				where: eq(categories.name, input),
			});

			if (category) return { success: false, message: `Kategori ${input} zaten mevcut.` };

			if (!input.match(/^[a-zA-Z0-9ğüşöçıİĞÜŞÖÇ ]{4,20}$/))
				return { success: false, message: "Lütfen geçerli bir kategori adı giriniz." };

            await createCategoryUseCase(input);

            revalidatePath("/dashboard/categories");

			return { success: true, message: "Kategori başarıyla eklendi." };
		} catch (error) {
			return { success: false, message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
		}
	});

export const deleteCategoryAction = authenticatedAction
    .createServerAction()
    .input(z.string())
    .handler(async ({ input: categoryId }) => {
        try {
            const [deletedCategory] = await database.delete(categories).where(eq(categories.id, categoryId)).returning();

            if (!deletedCategory) return { success: false, message: "Kategori bulunamadı." };

            revalidatePath("/dashboard/categories");

            return { success: true, message: "Kategori başarıyla silindi." };
        } catch (error) {
            return { success: false, message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
        }
    });