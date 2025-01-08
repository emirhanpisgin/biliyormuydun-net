"use client";
import { LogIn, Pencil, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/ui/drawer";
import { DialogDescription, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Session } from "next-auth";

interface CheckUserButtonProps {
    user: Session["user"];
}

export default function ProfileButton({ user }: CheckUserButtonProps) {
    if (user) {
        return (
            <Drawer>
                <DrawerTrigger>
                    <User className="size-8 text-foreground transition-all duration-75" />
                </DrawerTrigger>
                <DrawerContent>
                    <div className="relative w-full flex flex-col items-center">
                        <div className="absolute top-0 right-0 p-2">
                            <Button size={"icon"} variant={"outline"}>
                                <Pencil />
                            </Button>
                        </div>
                        <DialogTitle className="text-center text-3xl pt-2">
                            Profil
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            kullanıcı profili
                        </DialogDescription>
                        <img src={user.image!} alt="" className="rounded-full" />
                        <div className="flex flex-col items-center py-2">
                            <div className="font-semibold text-2xl">
                                {user.name}
                            </div>
                            <div className="text-xl opacity-75">
                                @{user.username}
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <LogIn onClick={() => signIn()} className="size-8 text-foreground transition-all duration-75" />
    );
}
