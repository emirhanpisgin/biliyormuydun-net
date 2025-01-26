import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddCategory from "./_components/add-category";
import CategoryCard from "./_components/category-card";
import { getCategories } from "./queries";

export default async function Categories() {
    const categories = await getCategories();

    // TODO - Sort categories alphabetically

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
                <AddCategory />
            </div>
            <div className="flex flex-col gap-2 pb-32">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
                {categories.length === 0 && (
                    <div className="text-center text-muted-foreground py-16">Henüz kategori eklenmemiş.</div>
                )}
            </div>
        </div>
    );
}
