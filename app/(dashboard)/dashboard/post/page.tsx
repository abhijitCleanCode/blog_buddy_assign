"use client"

import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AnimatedModal from "@/components/AnimatedModal";
import FormAddPost from '@/components/dashboard/pages/post/FormAddPost';
import { SkeletonCard } from '@/components/skeleton';
import dynamic from 'next/dynamic';

const LazyViewPost = dynamic(() => import("@/components/dashboard/pages/post/ViewPost"), { ssr: false, loading: () => <SkeletonCard /> })

const Page = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <section>
                <div className='flex items-center justify-between mb-16'>
                    <article className=''>
                        <h1 className='header'>Posts</h1>
                    </article>

                    <Button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-100 text-white hover:bg-blue-600"
                    >
                        <Plus color="#fff" size={24} /> Add post
                    </Button>
                </div>

                <Suspense fallback={<SkeletonCard />}>
                    <LazyViewPost />
                </Suspense>
            </section>

            <AnimatedModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Create Post"
            >
                <FormAddPost />
            </AnimatedModal>
        </>
    )
}

export default Page
