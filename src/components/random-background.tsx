"use client";

import { Monitor, Volleyball, HeartPulse, Book, FlaskConical, Music, Plane, Utensils, Shirt, DollarSign, TvMinimalPlay, Leaf, Car, Gamepad2, Scale, Brain } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";

export default function RandomBackground() {
    const icons = [Monitor, FlaskConical, HeartPulse, Book, Volleyball, Music, Plane, Utensils, Shirt, DollarSign, TvMinimalPlay, Leaf, Car, Gamepad2, Scale, Brain];

    let iconSize = 40;

    const generateIcons = () => {

        const isDesktop = useMediaQuery("(min-width: 1024px)");

        if (isDesktop) {
            iconSize = 48;
        }

        const gridSize = iconSize * 2;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        console.log(screenWidth);
        console.log(screenHeight);
        const manualOffset = gridSize;

        const elements: React.ReactNode[] = [];

        for (let x = -manualOffset; x < (screenHeight + manualOffset); x += gridSize) {
            for (let y = -manualOffset; y < (screenWidth + manualOffset); y += gridSize) {
                if(x < 0 && y < 0) {
                    console.log(x, y);
                }
                if(x > screenWidth && y > screenHeight) {
                    console.log(x, y);
                }
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
                        opacity: 0.4,
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
