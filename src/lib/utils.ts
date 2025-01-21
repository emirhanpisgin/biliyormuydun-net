import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
function generateRandomUsername(length: number = 8): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
    return usernameRegex.test(username);
}

function convertTurkishCharsToEnglish(str: string): string {
    const turkishChars = {
        ç: "c",
        ğ: "g",
        ı: "i",
        ö: "o",
        ş: "s",
        ü: "u",
        Ç: "C",
        Ğ: "G",
        İ: "I",
        Ö: "O",
        Ş: "S",
        Ü: "U"
    };
    return str.replace(/[çğışöüÇĞİŞÖÜ]/g, char => turkishChars[char as keyof typeof turkishChars] || char);
}

export function toUsername(displayName?: string, email?: string): string {
    const username = displayName ? convertTurkishCharsToEnglish(displayName.replace(/\s+/g, "").toLowerCase()) : "";
    if (isValidUsername(username)) {
        return username;
    }
    const emailUsername = email ? email.split("@")[0] : "";
    if (isValidUsername(emailUsername)) {
        return emailUsername;
    }
    return generateRandomUsername();
}

export const routeDisplayNames: { [x: `/${string}`]: string } = {
    "/dashboard": "Yönetim Paneli",
    "/blogs": "Bloglar",
    "/categories": "Kategoriler",
    "/topics": "Konular",
}

export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[çğışöü]/g, char => convertTurkishCharsToEnglish(char))
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}