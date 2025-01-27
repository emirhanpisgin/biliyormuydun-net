"use client";

import ProfilePhoto from "@/components/profile-photo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TopicWithRelations } from "@/db/schema/topics";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Ellipsis, LoaderCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteTopicAction } from "../actions";
import { useSession } from "next-auth/react";

interface TopicCardProps {
    data: TopicWithRelations;
}

export default function TopicCard({ data }: TopicCardProps) {
    const [verificationOpen, setVerificationOpen] = useState(false);
    const { data: session } = useSession();
    const { toast } = useToast();
    const { execute, isPending } = useServerAction(deleteTopicAction, {
        onSuccess({ data }) {
            setVerificationOpen(false);
            toast({
                title: data.success ? "Başarılı" : "Başarısız",
                description: data.message,
            })
        }
    })

    return (
        <div className="flex flex-col bg-background rounded-md border shadow-lg">
            <div className="flex items-center gap-3 px-3 p-2 border-b">
                <ProfilePhoto url={data.author?.image!} className="size-8" />
                <div className="flex gap-2 items-start flex-1">
                    <div>
                        {data.author?.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                        @{data.author?.username}
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="h-min ml-2">
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{data.createdAt.toLocaleString("tr")}</DropdownMenuLabel>
                        <DropdownMenuLabel>Kategori: {data.category?.name}</DropdownMenuLabel>
                        <DropdownMenuLabel>Kaynaklar: {data.sources.length}</DropdownMenuLabel>
                        {session?.user?.id === data.authorId && (<>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => setVerificationOpen((state) => !state)}>
                                <Trash /> Sil
                            </DropdownMenuItem>
                        </>)}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Emin misin?</DialogTitle>
                            <DialogDescription>
                                <span className="font-semibold break-all">
                                    {data.title}
                                </span> konusunu silmek istediğinize emin misiniz?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 justify-end">
                            <Button variant={"outline"}>
                                İptal
                            </Button>
                            <Button className="relative" disabled={isPending} variant={"destructive"} onClick={() => execute(data.id)}>
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
            <div className="flex gap-3 flex-col p-3 break-words border-b">
                <div className="font-semibold">
                    {data.title} <span className="text-sm text-muted-foreground">({data.slug})</span>
                </div>
                <div className="font-normal">
                    {data.content || <span className="text-muted-foreground italic">İçerik yok.</span>}
                </div>
            </div>
            <div className="flex p-3 py-2 justify-between text-muted-foreground text-sm">
                {data.createdAt.toLocaleString("tr")} - {data.category?.name} - {data.sources.length} kaynak
            </div>
        </div>
    );
}
