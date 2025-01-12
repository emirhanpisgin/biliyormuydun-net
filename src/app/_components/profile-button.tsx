"use client";
import { ArrowLeft, ArrowUpFromLine, Camera, LoaderCircle, LogIn, Pencil, Save, User as UserIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Drawer, DrawerContent, DrawerTrigger } from "../../components/ui/drawer";
import { DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button, buttonVariants } from "../../components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import ProfilePhoto from "@/components/profile-photo";
import { UploadButton } from "@/components/uploadthing";
import { useServerAction } from "zsa-react";
import { changeNameAction, changeUsernameAction } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "@/db/schema/users";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ProfileButtonProps {
    initialUser: User;
}

export default function ProfileButton({ initialUser }: ProfileButtonProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { data: session, update } = useSession();
    const user = (session?.user ?? initialUser) as User;


    const isDesktop = useMediaQuery("(min-width: 1024px)")

    if (user && !isDesktop) {
        return (
            <Drawer onClose={() => setIsSettingsOpen(false)}>
                <DrawerTrigger>
                    <UserIcon className="size-8 text-foreground transition-all duration-75" />
                </DrawerTrigger>
                <DrawerContent>
                    <ProfileContent user={user} isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} update={() => update()} isDesktop={isDesktop} />
                </DrawerContent>
            </Drawer >
        );
    }

    if (user && isDesktop) {
        return (
            <Sheet>
                <SheetTrigger>
                    <UserIcon className="size-8 text-foreground transition-all duration-75" />
                </SheetTrigger>
                <SheetContent>
                    <ProfileContent user={user} isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} update={() => update()} isDesktop={isDesktop} />
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <LogIn onClick={() => signIn()} className="size-8 text-foreground transition-all duration-75" />
    );
}

function ProfileContent({ user, isSettingsOpen, setIsSettingsOpen, update, isDesktop }: { user: User, isSettingsOpen: boolean, setIsSettingsOpen: Dispatch<SetStateAction<boolean>>, update: () => void, isDesktop: boolean }) {
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

    return (
        <div className="relative -z-10 w-full flex flex-col items-center">
            <div className={cn("absolute top-0 p-2", isDesktop ? "left-0" : "right-0")}>
                <Button size={"icon"} variant={"outline"} onClick={() => setIsSettingsOpen(state => !state)}>
                    {isSettingsOpen ? <ArrowLeft className="!size-5 lg:!size-6" /> : <Pencil className="!size-5 lg:!size-6" />}
                </Button>
            </div>
            {isDesktop ? (
                <SheetHeader>
                    <SheetTitle className="text-center text-3xl pt-2">
                        {isSettingsOpen ? "Ayarlar" : "Profil"}
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        kullanıcı profili
                    </SheetDescription>
                </SheetHeader>
            ) : (
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl pt-2">
                        {isSettingsOpen ? "Ayarlar" : "Profil"}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        kullanıcı profili
                    </DialogDescription>
                </DialogHeader>
            )}

            {
                !isSettingsOpen ? (<>
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
                                    if (isUploading) return <ArrowUpFromLine className="animate-pulse lg:!size-6" />;
                                    if (ready) return <Camera className="lg:!size-6"/>;
                                    return <LoaderCircle className="lg:!size-6 animate-spin"/>
                                }
                            }}
                            appearance={{
                                allowedContent: "hidden",
                                container: "bg-transparent",
                                button: buttonVariants({ size: "icon", variant: "outline", className: "!rounded-full lg:p-5" }),
                            }}
                            className="absolute -bottom-1 -right-1 cursor-pointer"
                            onClientUploadComplete={() => {
                                update();
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-12 *:flex *:items-end *:gap-2">
                        <div>
                            <Label className="text-xl">
                                İsim
                                <Input disabled={isChangeNamePending} className="mt-1 lg:text-xl" placeholder="İsim" value={name} onChange={(e) => setName(e.target.value)} />
                            </Label>
                            <Button size={"icon"} disabled={isChangeNamePending || name === user.name} onClick={() => executeChangeName(name)}>
                                {isChangeNamePending ? <LoaderCircle className="animate-spin lg:!size-6" /> : <Save className="lg:!size-6"/>}
                            </Button>
                        </div>
                        <div>
                            <Label className="text-xl">
                                Kullanıcı Adı
                                <Input spellCheck={false} disabled={isChangeUsernamePending} className="mt-1 lg:text-xl" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Label>
                            <Button size={"icon"} disabled={isChangeUsernamePending || username === user.username} onClick={() => executeChangeUsername(username)}>
                                {isChangeUsernamePending ? <LoaderCircle className="animate-spin lg:!size-6" /> : <Save className="lg:!size-6"/>}
                            </Button>
                        </div>
                    </div>
                </>)
            }
        </div >
    );
}