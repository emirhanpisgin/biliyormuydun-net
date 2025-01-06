"use client";
import { LogIn, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface CheckUserButtonProps {
    authorized: boolean;
}

export default function CheckUserButton({ authorized }: CheckUserButtonProps) {

    if (authorized) {
        return (
            <Link href="/profile">
                <User className="size-8 text-foreground transition-all duration-75" />
            </Link>
        );
    }

    return (
        <LogIn onClick={() => signIn()} className="size-8 text-foreground transition-all duration-75" />
    );
}
