import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddCategoryForm from "./_components/add-category-form";
import { database } from "@/db";
import CategoryCard from "./_components/category-card";

export default async function Categories() {
    const categoriesWithAuthors = await database.query.categories.findMany({
        with: {
            author: true,
        }
    });

    // TODO - Sort categories alphabetically
    // TODO - Check if it past 1 week after the category is created and show a new tag

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 pt-2">
                <div className="text-xl font-semibold hidden lg:flex items-center">
                    Kategoriler
                </div>
                <div className="flex justify-center flex-1">
                    <div className="w-full lg:w-1/2 flex gap-2">
                        <Input className="flex-1" placeholder="Kategori Adı..." />
                        <Button size={"icon"}>
                            <Search />
                        </Button>
                    </div>
                    {/* TODO - Make this functional */}
                </div>
                <AddCategoryForm />
            </div>
            <div className="flex flex-col gap-2 pb-32">
                {categoriesWithAuthors.map((category, index) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
                {categoriesWithAuthors.length === 0 && (
                    <div className="text-center text-muted-foreground py-16">Henüz kategori eklenmemiş.</div>
                )}
            </div>
        </div>
    );
}
