"use client"

import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SkeletonCard } from '@/components/skeleton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const LazyViewPost = dynamic(() => import("@/components/dashboard/pages/post/ViewPost"), { ssr: false, loading: () => <SkeletonCard /> })

const Page = () => {
    const router = useRouter();

    return (
        <>
            <section>
                <div className='flex items-center justify-between mb-16'>
                    <article>
                        <h1 className='header'>Posts</h1>
                    </article>

                    <Button
                        onClick={() => router.push("/dashboard/add-post")}
                        className="bg-blue-100 text-white hover:bg-blue-600"
                    >
                        <Plus color="#fff" size={24} /> Add post
                    </Button>
                </div>

                <Suspense fallback={<SkeletonCard />}>
                    <LazyViewPost />
                </Suspense>
            </section>
        </>
    )
}

export default Page
