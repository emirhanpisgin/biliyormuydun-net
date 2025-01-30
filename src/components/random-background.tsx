"use client";

import { Monitor, Volleyball, HeartPulse, Book, FlaskConical, Music, Plane, Utensils, Shirt, DollarSign, TvMinimalPlay, Leaf, Car, Gamepad2, Scale, Brain, Cat, Dog, PawPrint } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import React, { useEffect, useRef, useState } from "react";

export default function RandomBackground() {
    const icons = [Monitor, FlaskConical, HeartPulse, Book, Volleyball, Music, Plane, Utensils, Shirt, DollarSign, TvMinimalPlay, Leaf, Car, Gamepad2, Scale, Brain, Cat, Dog, PawPrint, Flower2];
    const isDesktop = useMediaQuery("(min-width: 1024px)");


    const generateIcons = () => {
        let iconSize = 40;

        if (isDesktop) {
            iconSize = 48;
        }

        const iconDensity = 1.9;

        const gridSize = iconSize * iconDensity;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const manualOffset = gridSize;

        const elements: React.ReactNode[] = [];

        for (let x = -manualOffset; x < (screenHeight + manualOffset); x += gridSize) {
            for (let y = -manualOffset; y < (screenWidth + manualOffset); y += gridSize) {
                const Icon = icons[Math.floor(Math.random() * icons.length)];
                const minPosX = gridSize + x;
                const minPosY = gridSize + y;
                const maxPosX = (gridSize + x) - iconSize;
                const maxPosY = (gridSize + y) - iconSize;

                const posX = Math.random() * (maxPosX - minPosX) + minPosX;
                const posY = Math.random() * (maxPosY - minPosY) + minPosY;


                elements.push(
                    <Icon key={`${x}-${y}`} style={{
                        position: "absolute",
                        top: posX,
                        left: posY,
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        opacity: Math.random() * 0.2,
                        rotate: `${Math.random() * 360}deg`,
                    }} />
                );
            }
        }



        return elements;
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen -z-50">
            {generateIcons()}
        </div>
    );
}

function Flower2({ ...props }: React.SVGProps<SVGSVGElement>) {
    const [isHovered, setIsHovered] = useState(false);
    const iconRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (iconRef.current) {
                const { left, right, top, bottom } = iconRef.current.getBoundingClientRect();
                const isInside =
                    event.clientX >= left &&
                    event.clientX <= right &&
                    event.clientY >= top &&
                    event.clientY <= bottom;
                setIsHovered(isInside);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <svg
            {...props}
            ref={iconRef}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-flower-2 z-50 transition-opacity duration-300 *:transition-colors *:duration-300 ${isHovered ? "!opacity-100" : ""}`}
        >
            <path className={`${isHovered ? "stroke-pink-300" : "stroke-current"}`} d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
            <circle className={`${isHovered ? "stroke-yellow-300" : "stroke-current"}`} cx="12" cy="8" r="2" />
            <path className={`${isHovered ? "stroke-green-700" : "stroke-current"}`} d="M12 10v12" />
            <path className={`${isHovered ? "stroke-green-400" : "stroke-current"}`} d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
            <path className={`${isHovered ? "stroke-green-400" : "stroke-current"}`} d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
        </svg>
    );
}