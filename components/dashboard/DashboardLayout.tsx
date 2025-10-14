'use client';

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/sidebar-provider";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isOpen } = useSidebar();

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-white dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    isOpen ? "lg:ml-72" : "lg:ml-[90px]"
                )}
            >
                <header className="sticky top-0 z-10">
                    <DashboardNavbar />
                </header>
                <div className="flex pt-8 pb-8 px-4 sm:px-8">{children}</div>
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300 pt-8 pb-8 px-4 sm:px-8",
                    isOpen ? "lg:ml-64" : "lg:ml-[90px]"
                )}
            >
                <Footer />
            </footer>
        </>
    );
}
