"use client"

import { ReactNode } from "react";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayout";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <>
            <SidebarProvider>
                <DashboardLayoutClient>{children}</DashboardLayoutClient>
            </SidebarProvider>

            <ToastContainer />
        </>
    )
}

export default Layout;
