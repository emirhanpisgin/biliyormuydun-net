"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Scrollable({ children, className, ...props }: ScrollableProps) {
    const scrollableRef = useRef<HTMLDivElement>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement>(null);
    const [moving, setMoving] = useState(false);

    useEffect(() => {
        if (!scrollableRef.current || !scrollbarThumbRef.current || !scrollbarRef.current) return;

        const scrollable = scrollableRef.current;
        const scrollbar = scrollbarRef.current;
        const scrollbarThumb = scrollbarThumbRef.current;

        const updateScrollbar = () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollable;
            const scrollableHeight = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;

            scrollbarThumb.style.height = `${scrollbarHeight}px`;
            scrollbarThumb.style.transform = `translateY(${(scrollTop / scrollableHeight) * (clientHeight - scrollbarHeight)}px)`;
        };

        const handleThumbMove = (e: MouseEvent) => {
            e.preventDefault();

            const { clientY } = e;
            const { scrollTop, scrollHeight, clientHeight } = scrollable;
            const scrollableHeight = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;

            const onMouseMove = (e: MouseEvent) => {
                setMoving(true);
                console.log("moving");
                const diff = e.clientY - clientY;
                const scrollableDiff = (diff / (clientHeight - scrollbarHeight)) * scrollableHeight;
                scrollable.scrollTop = scrollTop + scrollableDiff;
            };

            const onMouseUp = () => {
                setTimeout(() => setMoving(false), 300);
                console.log("not moving");
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };

        function handleJump(e: MouseEvent) {
            let moving;

            setMoving((prev) => {
                moving = prev;
                return prev;
            })

            if (moving) return;

            const { clientY } = e;
            const { top } = scrollbar.getBoundingClientRect();
            const { scrollHeight, clientHeight } = scrollable;
            const clickPosition = clientY - top;
            const scrollableHeight = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const respectiveScrollPosition = (clickPosition / (clientHeight - scrollbarHeight)) * scrollableHeight;
            const scrollbarThumbHeight = scrollbarThumb.getBoundingClientRect().height;
            const scrollPosition = (respectiveScrollPosition - (scrollbarThumbHeight / 2));

            scrollable.scrollTo({
                top: scrollPosition,
                behavior: "smooth"
            });
        };
        scrollable.addEventListener("scroll", updateScrollbar);
        scrollbar.addEventListener("click", handleJump);
        scrollbarThumb.addEventListener("mousedown", handleThumbMove);
        updateScrollbar();

        return () => {
            scrollable.removeEventListener("scroll", updateScrollbar);
            scrollbar.removeEventListener("click", handleJump);
            scrollbarThumb.removeEventListener("mousedown", handleThumbMove);
        };
    }, []);

    return (
        <div {...props} className="flex flex-col relative h-[calc(100vh-8rem)]">
            <div ref={scrollableRef} className={cn("scrollable relative flex-1", className)}>
                {children}
            </div>
            <div ref={scrollbarRef} className="absolute hidden lg:block top-0 left-full m-1 w-2 h-full z-50">
                <div ref={scrollbarThumbRef} className="bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">

                </div>
            </div>
        </div>
    );
}
