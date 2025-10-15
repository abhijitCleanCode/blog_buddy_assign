"use client"

import React from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

import { trpc } from "@/lib/trpc/trpc-client";

const Page = () => {
    const { data: categories, isLoading: loadingCategories } = trpc.categories.getAll.useQuery()

    console.log(categories)

    if (loadingCategories) {
        return (<div>Loading</div>)
    }

    return (
        <section>
            <div className='flex items-center justify-between mb-16'>
                <article className=''>
                    <h1 className='header'>Category</h1>
                </article>

                <Button
                    className="bg-blue-100 text-white hover:bg-blue-600"
                >
                    <Plus color="#fff" size={24} /> Add category
                </Button>
            </div>
        </section>
    )
}

export default Page;
