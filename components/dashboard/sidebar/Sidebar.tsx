"use client";

import { useSidebar } from "@/providers/sidebar-provider";
import TitleSection from "./TitleSection";
import Menu from "./Menu";

export default function Sidebar() {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <aside
            className={
                `fixed top-0 left-0 z-20 h-screen shrink-0 shadow -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300
                ${isOpen ? 'w-72' : 'w-16'}
                border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow`}
        >
            <TitleSection open={isOpen} />

            <Menu isOpen={isOpen} />
        </aside>
    )
}
