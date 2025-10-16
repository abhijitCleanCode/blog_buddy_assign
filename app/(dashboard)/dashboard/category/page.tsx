"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import dynamic from "next/dynamic";
import { SkeletonCard } from "@/components/skeleton";
import AnimatedModal from "@/components/AnimatedModal";
import FormAddCategory from "@/components/dashboard/pages/category/FormAddCategory";

const LazyViewCategory = dynamic(() => import("@/components/dashboard/pages/category/ViewCategory"), {
    ssr: false,
    loading: () => <SkeletonCard />,
})

const Page = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <section>
                <div className='flex items-center justify-between mb-16'>
                    <article className=''>
                        <h1 className='header'>Category</h1>
                    </article>

                    <Button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-100 text-white hover:bg-blue-600"
                    >
                        <Plus color="#fff" size={24} /> Add category
                    </Button>
                </div>

                <LazyViewCategory />
            </section>

            <AnimatedModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Create Category"
            >
                <FormAddCategory />
            </AnimatedModal>
        </>
    )
}

export default Page;
