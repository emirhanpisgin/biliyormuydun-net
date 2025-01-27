import { createCategory, getCategories } from "@/data-access/categories";


export async function getCategoriesUseCase() {
    return await getCategories();
}

export async function createCategoryUseCase(name: string) {
    await createCategory(name);
}