"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc/trpc-client";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useState } from "react";

function getBaseUrl() {
    if (typeof window !== 'undefined') return ''; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Vercel production
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL; // optional fallback
    return 'http://localhost:3000'; // local dev
}

export function TRPCProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
