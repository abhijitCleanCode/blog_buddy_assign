import { ReactNode } from "react";
import Header from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="root-container">
            <section className="flex h-full flex-1 flex-col">
                <Header />

                <div className="mt-20 pb-20">{children}</div>
            </section>
        </main>
    )
}

export default Layout
