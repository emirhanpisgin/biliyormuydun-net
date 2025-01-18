import { createCategory } from "@/data-access/categories";

export async function createCategoryUseCase(name: string, userId: string) {
    await createCategory(name, userId);
}