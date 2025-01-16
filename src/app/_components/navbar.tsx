"use client";
import ProfileButton from "./profile-button";
import ModeToggle from "@/components/mode-toggle";
import { AppWindow, ChevronRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

interface NavbarProps {
    session: Session | null;
}

const routeDisplayNames: { [x: `/${string}`]: string } = {
    "/dashboard": "Yönetim Paneli",
    "/blogs": "Bloglar",
}

export default function Navbar({ session }: NavbarProps) {
    const pathname = usePathname();
    const [routes, setRoutes] = useState<string[]>(pathname.split("/").filter(Boolean));
    
    useEffect(() => {
        setRoutes(pathname.split("/").filter(Boolean));
    },[pathname])

    return (
        <MaxWidthWrapper className="hidden p-2 lg:block">
            <div className="flex border rounded-lg p-4 gap-6 justify-end">
                <div className="flex flex-1 gap-2">
                    <Link href={"/"} className="font-semibold text-xl">
                        Biliyor Muydun?
                    </Link>
                    {!!routes?.length && routes?.map((route) => (
                        <div key={route} className="flex items-center gap-2">
                            <ChevronRight className="size-5" />
                            <Link href={`/${route}`} className="text-lg hover:underline underline-offset-2">
                                {routeDisplayNames[`/${route}`]}
                            </Link>
                        </div>
                    ))}
                </div>
                <Link href={"/dashboard"}>
                    <AppWindow className="size-7" />
                </Link>
                <ModeToggle />
                <ProfileButton initialUser={session?.user} />
            </div>
        </MaxWidthWrapper>
    );
}
