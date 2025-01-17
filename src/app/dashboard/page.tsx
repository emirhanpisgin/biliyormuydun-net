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
        <div className="flex gap-4 justify-center items-center">
            <Link className={buttonVariants()} href={"/dashboard/blogs"}>Bloglar</Link>
            <Link className={buttonVariants()} href={"/dashboard/topics"}>Konular</Link>
            <Link className={buttonVariants()} href={"/dashboard/categories"}>Kategoriler</Link>
        </div>
    );
}
