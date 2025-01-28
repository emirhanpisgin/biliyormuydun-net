import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddTopic from "./_components/add-topic";
import { getTopicsWithRelationsUseCase } from "@/use-cases/topics";
import { getCategoriesUseCase } from "@/use-cases/categories";
import TopicCard from "./_components/topic-card";
import Scrollable from "@/components/scrollable";

export default async function Topics() {
    const topicsWithRelations = await getTopicsWithRelationsUseCase();
    const categories = await getCategoriesUseCase();

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 pt-2">
                <div className="text-xl font-semibold hidden lg:flex items-center">
                    Konular
                </div>
                <div className="flex justify-center flex-1">
                    <div className="w-full lg:w-1/2 flex gap-2">
                        <Input className="flex-1" placeholder="Konu Başlığı..." />
                        <Button size={"icon"}>
                            <Search />
                        </Button>
                    </div>
                    {/* TODO - Make this functional */}
                </div>
                <AddTopic categories={categories} />
            </div>
            <Scrollable className="flex flex-col gap-2 pb-32">
                {topicsWithRelations.map((topic) => (
                    <TopicCard data={topic} key={topic.id} />
                ))}
                {topicsWithRelations.length === 0 && (
                    <div className="text-center text-muted-foreground py-16">Henüz konu eklenmemiş.</div>
                )}
            </Scrollable>
        </div>
    );
}
