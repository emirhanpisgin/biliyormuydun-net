import { auth } from "@/lib/auth";
import ProfileButton from "./profile-button";
import ModeToggle from "@/components/mode-toggle";

export default async function Navbar() {
    const session = await auth();

    return (
        <div className="absolute hidden lg:flex w-full top-0 left-0 p-6 gap-6 justify-end">
            <ModeToggle />
            <ProfileButton initialUser={session?.user}/>
        </div>
    );
}
