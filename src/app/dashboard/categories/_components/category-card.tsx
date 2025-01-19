"use client";
import ProfilePhoto from "@/components/profile-photo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CategoryWithAuthor } from "@/db/schema/categories";
import { useToast } from "@/hooks/use-toast";
import { Ellipsis, LoaderCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteCategoryAction } from "../actions";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    category: CategoryWithAuthor;
}

export default function CategoryCard({ category: { createdAt, author, name } }: CategoryCardProps) {
    const [verificationOpen, setVerificationOpen] = useState(false);
    const { toast } = useToast();
    const { execute, isPending } = useServerAction(deleteCategoryAction, {
        onSuccess({ data }) {
            setVerificationOpen(false);
            toast({
                title: data.success ? "Başarılı" : "Başarısız",
                description: data.message,
            })
        }
    })


    return (
        <div className="border p-3 rounded-lg flex flex-col gap-2">
            <div className="flex">
                <div className="font-semibold text-lg line-clamp-1 flex-1">
                    {name}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="pointer-events-none">{createdAt.toLocaleString("tr")}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => setVerificationOpen((state) => !state)}>
                            <Trash /> Sil
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Emin misin?</DialogTitle>
                            <DialogDescription>
                                <span className="font-semibold">
                                    {name}
                                </span> kategorisini silmek istediğinize emin misiniz?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 justify-end">
                            <Button variant={"outline"}>
                                İptal
                            </Button>
                            <Button className="relative" disabled={isPending} variant={"destructive"} onClick={() => execute(name)}>
                                <div className={isPending ? "opacity-0" : "opacity-100"}>
                                    Sil
                                </div>
                                <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", isPending ? "block" : "hidden")}>
                                    <LoaderCircle className="animate-spin" />
                                </div>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex items-center gap-2">
                <ProfilePhoto url={author.image!} className="size-8" />
                <div>
                    {author.name}
                </div>
            </div>
        </div>
    );
}
