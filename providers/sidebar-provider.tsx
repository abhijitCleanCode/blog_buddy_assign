"use client"

import { ReactNode, createContext, useContext, useRef } from "react"
import { createSidebarStore, SidebarState } from "@/store/sidebar-store"
import { useStore, StoreApi } from "zustand";

type SidebarStore = StoreApi<SidebarState>;

const SidebarContext = createContext<SidebarStore | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<SidebarStore | null>(null);

    // only create once on the client side
    if (!storeRef.current) {
        storeRef.current = createSidebarStore();
    }

    return (
        <SidebarContext.Provider value={storeRef.current}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const store = useContext(SidebarContext);
    if (!store) throw new Error("useSidebar must be used within a SidebarProvider");

    return useStore(store);
}
