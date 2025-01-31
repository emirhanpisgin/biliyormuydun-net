"use server";
import { database } from "@/db";
import { categories, topics } from "@/db/schema";
import { authenticatedAction } from "@/lib/safe-action";
import { createTopicUseCase, deleteTopicUseCase } from "@/use-cases/topics";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTopicAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            title: z.string(),
            slug: z.string(),
            content: z.string(),
            sources: z.array(z.string()),
            categoryId: z.string(),
        })
    )
    .handler(async ({ ctx, input }) => {
        try {
            const { title, slug, content, sources, categoryId } = input;

            if (!title.match(/^[a-zA-Z0-9_ğüşöçıİĞÜŞÖÇ ]{30,200}$/)) return { success: false, message: "Lütfen geçerli bir başlık giriniz." };

            if (!slug.match(/^[a-z0-9-]{3,100}$/)) return { success: false, message: "Lütfen geçerli bir url giriniz." };

            if (!content.match(/^[a-zA-Z0-9_ğüşöçıİĞÜŞÖÇ ]{0,300}$/)) return { success: false, message: "Lütfen geçerli bir içerik giriniz." };

            if (!sources.length) return { success: false, message: "Lütfen en az bir kaynak giriniz." };

            if (!sources.every((source: string) => source.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)))
                return { success: false, message: "Lütfen geçerli kaynaklar giriniz." };

            const category = await database.query.categories.findFirst({
                where: eq(categories.id, categoryId),
            });

            if (!category) return { success: false, message: "Seçtiğiniz kategori bulunamadı." };

            const topic = await database.query.topics.findFirst({
                where: eq(topics.slug, slug),
            });

            if (topic) return { success: false, message: `Konu kimliği \"${slug}\" zaten mevcut.` };

            await createTopicUseCase({ ...input, authorId: ctx.id });

            revalidatePath("/");

            return { success: true, message: "Konu başarıyla eklendi." };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
        }
    });

export const deleteTopicAction = authenticatedAction
    .createServerAction()
    .input(z.string())
    .handler(async ({ input }) => {
        try {
            const topic = await database.query.topics.findFirst({
                where: eq(topics.id, input),
            });

            if (!topic) return { success: false, message: "Konu bulunamadı." };

            await deleteTopicUseCase(input);

            revalidatePath("/");

            return { success: true, message: "Konu başarıyla silindi." };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
        }
    });
