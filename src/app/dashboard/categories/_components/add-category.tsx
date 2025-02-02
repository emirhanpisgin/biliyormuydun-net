"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { addCategoryAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddCategory() {
    const [open, setOpen] = useState(false);


    // TODO - Beautify success returns

    const isDesktop = useMediaQuery("(min-width: 1024px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger className={buttonVariants()}>
                    <Plus className="size-5" /> Kategori Oluştur
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yeni Kategori Oluştur</DialogTitle>
                        <DialogDescription className="sr-only">kategori oluşturma ekranı</DialogDescription>
                    </DialogHeader>
                    <AddCategoryForm setOpen={setOpen} />
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
                    <SheetTitle>Yeni Kategori Oluştur</SheetTitle>
                    <SheetDescription className="sr-only">kategori oluşturma ekranı</SheetDescription>
                </SheetHeader>
                <AddCategoryForm setOpen={setOpen} />
            </SheetContent>
        </Sheet>
    );
}

interface AddCategoryFormProps {
    setOpen: (open: boolean) => void;
}

function AddCategoryForm({ setOpen }: AddCategoryFormProps) {
    const [categoryName, setCategoryName] = useState("");
    const { toast } = useToast();
    const { isPending, execute } = useServerAction(addCategoryAction, {
        onSuccess: ({ data }) => {
            setOpen(false);
            setCategoryName("");
            toast({
                title: data.success ? "Başarılı" : "Başarısız",
                description: data.message,
            })
        }
    });

    return (
        <form className="flex gap-2 justify-end items-end py-4">
            <Label className="text-lg w-full flex-1">
                Kategori Adı
                <Input disabled={isPending} className="mt-1 lg:text-base" placeholder="Kategori Adı" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </Label>
            <Button type="submit" onClick={() => execute(categoryName)} disabled={isPending}>
                <Check /> Ekle
            </Button>
        </form>
    );
}