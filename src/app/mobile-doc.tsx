import { House } from "lucide-react";
import Link from "next/link";
import ProfileButton from "./profile-button";
import { auth } from "@/lib/auth";
import ModeToggleMobile from "@/components/mode-toggle-mobile";

export default async function MobileDoc() {
    const session = await auth();

    return (
        <div className="w-full fixed bottom-0 left-0 lg:hidden">
            <div className="w-full h-full py-4 border-t flex gap-[15%] justify-center items-center">
                <ProfileButton initialUser={session?.user}/>
                <Link href="/">
                    <House className="size-8 text-foreground transition-all" />
                </Link>
                <ModeToggleMobile />
            </div>
        </div>
    );
}
