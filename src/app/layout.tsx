import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import MobileDoc from "@/app/_components/mobile-doc";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./_components/navbar";
import { auth } from "@/lib/auth";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import RandomBackground from "@/components/random-background";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Biliyor Muydun?",
    description: "Built by emirhanpisgin",
};

// TODO: add custom not found screen

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <RandomBackground />
                <NextSSRPlugin
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <Providers>
                    <MaxWidthWrapper>
                        <Navbar session={session} />
                        {children}
                        <MobileDoc />
                        <Toaster />
                    </MaxWidthWrapper>
                </Providers>
            </body>
        </html>
    );
}
