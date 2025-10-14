"use client"

import DashboardLayoutClient from "@/components/dashboard/DashboardLayout";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <SidebarProvider>
            <DashboardLayoutClient>{children}</DashboardLayoutClient>
        </SidebarProvider>
    )
}

export default Layout;
