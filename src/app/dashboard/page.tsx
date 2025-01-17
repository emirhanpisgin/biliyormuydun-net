import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session || session?.user?.role !== "admin") {
        return notFound();
    }

    return (
        <MaxWidthWrapper className="flex gap-4 justify-center items-center">
            <Link className={buttonVariants()} href={"/blogs"}>Bloglar</Link>
            <Link className={buttonVariants()} href={"/topics"}>Konular</Link>
            <Link className={buttonVariants()} href={"/categories"}>Kategoriler</Link>
        </MaxWidthWrapper>
    );
}
