"use client";
import { buttonVariants, Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Check, LoaderCircle, Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useServerAction } from "zsa-react";
import { createTopicAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { slugify } from "@/lib/utils";
import MultipleInput from "@/components/multiple-input";
import { Category } from "@/db/schema/categories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddTopicProps {
    categories: Category[];
}

export default function AddTopic({ categories }: AddTopicProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger className={buttonVariants()}>
                    <Plus className="size-5" /> Konu Ekle
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yeni Konu Ekle</DialogTitle>
                        <DialogDescription className="sr-only">konu ekleme ekranı</DialogDescription>
                    </DialogHeader>
                    <AddTopicForm setOpen={setOpen} categories={categories} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
            <SheetTrigger className={buttonVariants({ size: "icon" })}>
                <Plus />
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                    <SheetTitle>Yeni Konu Ekle</SheetTitle>
                    <SheetDescription className="sr-only">konu ekleme ekranı</SheetDescription>
                </SheetHeader>
                <AddTopicForm setOpen={setOpen} categories={categories} />
            </SheetContent>
        </Sheet>
    );
}

interface AddTopicFormProps {
    setOpen: (open: boolean) => void;
    categories: Category[];
}

function AddTopicForm({ setOpen, categories }: AddTopicFormProps) {
    const [topicTitle, setTopicTitle] = useState("");
    const [topicContent, setTopicContent] = useState("");
    const [topicSlug, setTopicSlug] = useState("");
    const [topicSlugChanged, setTopicSlugChanged] = useState(false);
    const [topicSources, setTopicSources] = useState<string[]>([]);
    const [topicCategoryId, setTopicCategoryId] = useState("");
    const { toast } = useToast();
    const { execute, isPending } = useServerAction(createTopicAction, {
        onSuccess({ data }) {
            toast({
                title: data.success ? "Başarılı" : "Başarısız",
                description: data.message,
            });
        },
    });

    useEffect(() => {
        if (topicSlugChanged) return;
        const slug = slugify(topicTitle);
        setTopicSlug(slug);
    }, [topicTitle, topicSlugChanged]);

    async function handleCreateTopic() {
        execute({
            title: topicTitle,
            slug: topicSlug,
            content: topicContent,
            categoryId: topicCategoryId,
            sources: topicSources,
        });
    }

    return (
        <div className="flex flex-col gap-2 justify-end max-w-full items-end py-4">
            <Label className="w-full">
                Başlık
                <Input
                    disabled={isPending}
                    className="mt-1 lg:text-base"
                    placeholder="Konu Başlığı"
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                />
            </Label>
            <Label className="w-full relative">
                <div className="flex">
                    <p className="line-clamp-1 flex items-center gap-2 flex-1">
                        URL <span className="text-muted-foreground text-base">(konular/{topicSlug || "konu-linki"})</span>
                    </p>
                    {topicSlugChanged && <RefreshCcw className="size-6 mx-1 cursor-pointer" onClick={() => setTopicSlugChanged(false)} />}
                </div>
                <Input
                    disabled={isPending}
                    className="mt-1 lg:text-base"
                    placeholder="Konu URL'i"
                    value={topicSlug}
                    onChange={(e) => {
                        const slug = slugify(e.target.value);
                        setTopicSlug(slug);
                        setTopicSlugChanged(true);
                    }}
                />
            </Label>
            <Label className="w-full">
                Konu İçeriği
                <AutosizeTextarea
                    disabled={isPending}
                    className="mt-1 lg:text-base resize-none"
                    placeholder="Konu İçeriği"
                    value={topicContent}
                    onChange={(e) => setTopicContent(e.target.value)}
                />
            </Label>
            <Label className="w-full">
                Kaynaklar
                <MultipleInput
                    inputs={topicSources}
                    setInputs={setTopicSources}
                    className="max-w-lg"
                    emptyDescription={"Hiçbir kaynak eklenmedi. Eklemek için \"Enter\" tuşuna basın."}
                    inputProps={{
                        className: "mt-1 lg:text-base",
                        placeholder: "Kaynak URL",
                        disabled: isPending,
                    }}
                />
            </Label>
            <Label className="w-full">
                <p className="mb-1">
                    Kategori
                </p>
                <Select onValueChange={(value) => setTopicCategoryId(value)}>
                    <SelectTrigger className="w-full !text-base">
                        <SelectValue className="!text-base" placeholder="Kategori seçilmedi." />
                    </SelectTrigger>
                    <SelectContent >
                        {categories.map((category) => (
                            <SelectItem className="!text-base" key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Label>
            <div className="flex gap-2 pt-3 justify-center w-full">
                <Button variant={"outline"} onClick={() => setOpen(false)} disabled={isPending}>
                    İptal
                </Button>
                <Button onClick={() => handleCreateTopic()} disabled={isPending}>
                    {isPending ? <LoaderCircle className="animate-spin size-5" /> : <Check className="size-5" />} Ekle
                </Button>
            </div>
        </div>
    );
}
