"use client";
import { cn } from "@/lib/utils";
import React from 'react';

interface ProfilePhotoProps extends React.HTMLProps<HTMLDivElement> {
    url: string;
}

export default function ProfilePhoto({ url, className }: ProfilePhotoProps) {

    return (
        <div className={cn("size-24 lg:size-36 relative", className)}>
            <div className="size-24 lg:size-36 bg-primary/10 animate-pulse rounded-full absolute top-0 left-0" />
            <img
                src={url}
                alt="user profile photo"
                className={"rounded-full absolute size-24 lg:size-36"}
            />
        </div>
    );
}
