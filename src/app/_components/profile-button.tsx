"use client";
import { ArrowLeft, ArrowUpFromLine, Camera, Dot, Ellipsis, LoaderCircle, LogIn, LogOut, Pencil, Save, User as UserIcon, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
            <div className="absolute flex gap-1 top-0 right-0 p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className={buttonVariants({ size: "icon", variant: "ghost" })}>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                            {isSettingsOpen ? (<><ArrowLeft /> Geri Dön</>) : (<><Pencil /> Düzenle</>)}

                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => signOut()}>
                            <LogOut /> Çıkış Yap
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
            {!isSettingsOpen ?
                (<>
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
                    <div className="relative pt-3">
                        <ProfilePhoto url={user.image!} />
                        <UploadButton
                            endpoint={"profilePhotoUploader"}
                            content={{
                                button({ ready, isUploading }) {
                                    if (isUploading) return <ArrowUpFromLine className="animate-pulse lg:!size-6" />;
                                    if (ready) return <Pencil className="size-6" />;
                                    return <LoaderCircle className="lg:!size-6 animate-spin" />
                                }
                            }}
                            appearance={{
                                allowedContent: "hidden",
                                container: "bg-transparent",
                                button: buttonVariants({ size: "icon" }),
                            }}
                            className="absolute -bottom-1 -right-1 cursor-pointer"
                            onClientUploadComplete={() => {
                                update();
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-12 px-5 *:flex *:items-end *:gap-2 w-full">
                        <div className="w-full flex">
                            <Label className="text-xl w-full flex-1">
                                İsim
                                <Input disabled={isChangeNamePending} className="mt-1 lg:text-base" placeholder="İsim" value={name} onChange={(e) => setName(e.target.value)} />
                            </Label>
                            <Button size={"icon"} disabled={isChangeNamePending || name === user.name} onClick={() => executeChangeName(name)}>
                                {isChangeNamePending ? <LoaderCircle className="animate-spin lg:!size-6" /> : <Save className="lg:!size-6" />}
                            </Button>
                        </div>
                        <div className="w-full flex">
                            <Label className="text-xl w-full flex-1">
                                Kullanıcı Adı
                                <Input spellCheck={false} disabled={isChangeUsernamePending} className="mt-1 lg:text-base w-full" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Label>
                            <Button size={"icon"} disabled={isChangeUsernamePending || username === user.username} onClick={() => executeChangeUsername(username)}>
                                {isChangeUsernamePending ? <LoaderCircle className="animate-spin lg:!size-6" /> : <Save className="lg:!size-6" />}
                            </Button>
                        </div>
                    </div>
                </>)
            }
        </div >
    );
}