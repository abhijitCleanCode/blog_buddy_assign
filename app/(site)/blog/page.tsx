"use client"

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SkeletonCard } from '@/components/skeleton';

const LazyViewBlogs = dynamic(() => import("@/components/allBlogs/ViewBlogs"), {
    ssr: false,
    loading: () => <SkeletonCard />
})

const Page = () => {
    return (
        <>
            <section>
                <div className='flex items-center justify-between mb-16'>
                    <article>
                        <h1 className='header'>All Blogs</h1>
                    </article>
                </div>

                <Suspense fallback={<SkeletonCard />}>
                    <LazyViewBlogs />
                </Suspense>
            </section>
        </>
    )
}

export default Page;
