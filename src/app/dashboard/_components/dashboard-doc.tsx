"use client";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { routeDisplayNames } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardDoc() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const [routes, setRoutes] = useState<string[]>(pathname.split("/").filter(Boolean));

    useEffect(() => {
        setRoutes(pathname.split("/").filter(Boolean));
    }, [pathname])

    return (
        <div className="w-full block lg:hidden">
            <div className="border flex justify-end rounded-lg p-4 bg-background shadow-lg">
                <div className="flex-1 flex gap-4 items-center">
                    <div className="flex items-center gap-1">
                        <Link href={"/dashboard"} className="font-semibold text-lg">
                            Yönetim Paneli
                        </Link>
                        {routes.length > 1 && (
                            <div className="flex gap-1 items-center">
                                <ChevronRight className="size-5"/>
                                {routeDisplayNames[`/${routes[1]}`]}
                            </div>
                        )}
                    </div>
                </div>
                <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
                    <SheetTrigger>
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
