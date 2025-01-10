import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "./navbar";

export default async function Home() {
    return (
        <MaxWidthWrapper className="relative">
            <Navbar />
        </MaxWidthWrapper>
    );
}
