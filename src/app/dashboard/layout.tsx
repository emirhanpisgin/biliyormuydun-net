import DashboardDoc from "./_components/dashboard-doc";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="relative h-full">
            <DashboardDoc />
            {children}
        </div>
    );
}
