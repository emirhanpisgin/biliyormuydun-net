"use client";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardDoc() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full py-2 block lg:hidden">
            <div className="border flex justify-end rounded-lg p-4 bg-background shadow-lg">
                <div className="flex-1 flex gap-4 items-center">
                    <div className="font-semibold text-lg flex items-center">
                        Yönetim Paneli
                    </div>
                </div>
                <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
                    <SheetTrigger className={isDesktop ? "hidden" : "block"}>
                        <Menu className="size-8" />
                    </SheetTrigger>
                    <SheetContent side={"top"}>
                        <SheetHeader className="flex flex-row w-full !space-y-0 items-center">
                            <SheetTitle className="text-left flex-1">Menü</SheetTitle>
                            <SheetDescription className="sr-only">menü</SheetDescription>
                            <SheetClose>
                                <X className="size-8" />
                            </SheetClose>
                        </SheetHeader>
                        <div className="flex flex-col *:border-t text-xl *:p-3" onClick={() => setOpen(false)}>
                            <Link href={"/dashboard/blogs"} className="border-none">Bloglar</Link>
                            <Link href={"/dashboard/topics"}>Konular</Link>
                            <Link href={"/dashboard/categories"}>Kategoriler</Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
