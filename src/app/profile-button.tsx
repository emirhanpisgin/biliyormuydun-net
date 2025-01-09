"use client";
import { ArrowUpFromLine, Camera, LoaderCircle, LogIn, Pencil, Plus, Save, User as UserIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/ui/drawer";
import { DialogDescription, DialogTitle } from "../components/ui/dialog";
import { Button, buttonVariants } from "../components/ui/button";
import { useState } from "react";
import ProfilePhoto from "@/components/profile-photo";
import { UploadButton } from "@/components/uploadthing";
import { useServerAction } from "zsa-react";
import { changeNameAction, changeUsernameAction } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";

interface ProfileButtonProps {
    initialUser: User;
}

export default function ProfileButton({ initialUser }: ProfileButtonProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { data: session, update } = useSession();
    const user = (session?.user ?? initialUser) as User;
    const [name, setName] = useState(user.name!);
    const [username, setUsername] = useState(user.username!);
    const { execute: executeChangeName, isPending: isChangeNamePending, isSuccess: isChangeNameSuccess } = useServerAction(changeNameAction, {
        onSuccess({ data }) {
            update();
            toast({
                title: data.success ? "Başarılı!" : "Başarısız!",
                description: data.message,
            });
        }
    });
    const { execute: executeChangeUsername, isPending: isChangeUsernamePending, isSuccess: isChangeUsernameSuccess } = useServerAction(changeUsernameAction, {
        onSuccess({ data }) {
            update();
            toast({
                title: data.success ? "Başarılı!" : "Başarısız!",
                description: data.message,
            });
        }
    });
    const { toast } = useToast();

    if (user) {
        return (
            <Drawer onClose={() => setIsSettingsOpen(false)}>
                <DrawerTrigger>
                    <UserIcon className="size-8 text-foreground transition-all duration-75" />
                </DrawerTrigger>
                <DrawerContent>
                    <div className="relative w-full flex flex-col items-center">
                        <div className="absolute top-0 right-0 p-2">
                            <Button size={"icon"} variant={"outline"} onClick={() => setIsSettingsOpen(state => !state)}>
                                {isSettingsOpen ? <Plus className="rotate-45 !size-5" /> : <Pencil className="!size-5" />}
                            </Button>
                        </div>
                        <DialogTitle className="text-center text-3xl pt-2">
                            {isSettingsOpen ? "Ayarlar" : "Profil"}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            kullanıcı profili
                        </DialogDescription>
                        {!isSettingsOpen ? (<>
                            <ProfilePhoto url={user.image!} />
                            <div className="flex flex-col items-center py-2">
                                <div className="font-semibold text-2xl">
                                    {user.name}
                                </div>
                                <div className="text-xl opacity-75">
                                    @{user.username}
                                </div>
                            </div>
                        </>) : (<>
                            <div className="relative">
                                <ProfilePhoto url={user.image!} />
                                <UploadButton
                                    endpoint={"profilePhotoUploader"}
                                    content={{
                                        button({ ready, isUploading }) {
                                            if (isUploading) return <ArrowUpFromLine className="animate-pulse" />;
                                            if (ready) return <Camera />;
                                            return <LoaderCircle />
                                        }
                                    }}
                                    appearance={{
                                        allowedContent: "hidden",
                                        container: buttonVariants({ variant: "outline", size: "icon", className: "!rounded-full !bg-background !ring-transparent border-input" }),
                                        button: "size-8 bg-transparent"
                                    }}
                                    className="absolute -bottom-1 -right-1"
                                    onClientUploadComplete={() => {
                                        update();
                                    }}
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2 mb-12 *:flex *:items-end *:gap-2">
                                <div>
                                    <Label className="text-xl">
                                        İsim
                                        <Input disabled={isChangeNamePending} className="mt-1" placeholder="İsim" value={name} onChange={(e) => setName(e.target.value)} />
                                    </Label>
                                    <Button size={"icon"} disabled={isChangeNamePending || name === user.name} onClick={() => executeChangeName(name)}>
                                        {isChangeNamePending ? <LoaderCircle className="animate-spin"/> : <Save />}
                                    </Button>
                                </div>
                                <div>
                                    <Label className="text-xl">
                                        Kullanıcı Adı
                                        <Input spellCheck={false} disabled={isChangeUsernamePending} className="mt-1" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </Label>
                                    <Button size={"icon"} disabled={isChangeUsernamePending || username === user.username} onClick={() => executeChangeUsername(username)}>
                                        {isChangeUsernamePending ? <LoaderCircle className="animate-spin"/> : <Save />}
                                    </Button>
                                </div>
                            </div>
                        </>)}
                    </div>
                </DrawerContent>
            </Drawer >
        );
    }

    return (
        <LogIn onClick={() => signIn()} className="size-8 text-foreground transition-all duration-75" />
    );
}
