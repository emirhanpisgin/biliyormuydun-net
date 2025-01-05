import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;

}

export default function MaxWidthWrapper({ children, className, ...props }: MaxWidthWrapperProps ) {
    return (
        <div {...props} className={cn("w-full lg:w-[90%] xl:w-5/6 2xl:w-4/5 mx-auto px-4", className)}>
            {children}
        </div>
    );
}
