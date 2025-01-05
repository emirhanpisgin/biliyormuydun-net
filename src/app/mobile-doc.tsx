import { Bell, House } from 'lucide-react';
import Link from "next/link";
import CheckUserButton from "../components/check-user-button";
import { auth } from "@/lib/auth";


export default async function MobileDoc() {
    const session = await auth();

    return (
        <div className="w-full h-20 fixed p-3 bottom-0 left-0 lg:hidden">
            <div className="w-full h-full rounded-full border flex gap-[10%] justify-center items-center">
                <CheckUserButton authorized={!!session?.user}/>
                <Link href="/">
                    <House className="size-8 text-foreground drop-shadow active:drop-shadow-none active:scale-90 transition-all" />
                </Link>
                <Bell className="size-8 text-foreground drop-shadow active:drop-shadow-none active:scale-90 transition-all" />
            </div>
        </div>
    );
}
