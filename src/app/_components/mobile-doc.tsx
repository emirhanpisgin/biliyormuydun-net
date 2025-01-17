import { AppWindow, House } from "lucide-react";
import Link from "next/link";
import ProfileButton from "./profile-button";
import { auth } from "@/lib/auth";
import ModeToggle from "@/components/mode-toggle";

export default async function MobileDoc() {
    const session = await auth();

    return (
        <div className="w-full fixed bottom-0 left-0 lg:hidden p-2">
            <div className="w-full h-full bg-background py-4 border flex gap-[15%] shadow-lg rounded-lg justify-center items-center">
                <Link href="/">
                    <House className="size-8 text-foreground transition-all" />
                </Link>
                <ProfileButton initialUser={session?.user} />
                <ModeToggle />
                {session?.user?.role === "admin" && (
                    <Link href="/dashboard">
                        <AppWindow className="size-8" />
                    </Link>
                )}
            </div>
        </div>
    );
}
