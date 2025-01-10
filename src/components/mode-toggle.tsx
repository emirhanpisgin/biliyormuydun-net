"use client";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="relative size-8"/>;

    return (
        <div className="relative size-8 hover:cursor-pointer">
            <Moon onClick={() => setTheme("light")} className={cn("size-8 lg:size-9 absolute top-0 left-0 text-foreground drop-shadow transition-all duration-75", theme === "light" ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto")} />
            <Sun onClick={() => setTheme("dark")} className={cn("size-8 lg:size-9 absolute top-0 left-0 text-foreground drop-shadow transition-all duration-75", theme === "dark" ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto")} />
        </div>
    );
}