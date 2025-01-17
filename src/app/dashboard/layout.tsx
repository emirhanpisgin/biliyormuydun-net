import MaxWidthWrapper from "@/components/max-width-wrapper";
import DashboardDoc from "./_components/dashboard-doc";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <MaxWidthWrapper className="relative">
            <DashboardDoc />
            {children}
        </MaxWidthWrapper>
    );
}
