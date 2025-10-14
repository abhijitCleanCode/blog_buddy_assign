import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from "zustand/middleware";

// define store shape
export interface SidebarState {
    isOpen: boolean;
    toggleSidebar: () => void;
    setOpen: (open: boolean) => void;
}

// factory fn to create a new store instance per request
export const createSidebarStore = (initState: Partial<SidebarState> = {}) => {
    return createStore<SidebarState>()(
        persist((set) => ({
            isOpen: initState.isOpen ?? true,
            toggleSidebar: () => set((s) => ({ isOpen: !s.isOpen })),
            setOpen: (open) => set({ isOpen: open })
        }),
            {
                name: "sidebar-storage",
                storage: createJSONStorage(() => localStorage)
            }
        ))
}
