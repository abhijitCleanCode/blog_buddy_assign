"use client";

import React, { useMemo } from 'react';

import { useParams } from 'next/navigation';
import { trpc } from '@/lib/trpc/trpc-client';
import ContentRenderer from '@/components/ContentRenderer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Loader from '@/components/Loaer';

const Page = () => {
    const params = useParams<{ id: string }>();
    const postId = params.id;

    const input = useMemo(() => ({ id: postId }), [postId])

    const { data: post, isLoading } = trpc.post.getById.useQuery(input);

    if (isLoading) {
        return (
            <Loader message="Please wait fetching post...." />
        )
    }

    return (
        <section>
            <article>
                <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-tight tracking-tight">
                    {post?.title}
                </h2>

                <p className="leading-tight tracking-tight text-dark-600 mt-4">slug: {post?.slug}</p>
            </article>

            <article className='p-7'>
                <ContentRenderer content={post?.content ?? ""} />
            </article>

            <div className="px-4">
                {post?.categories.map((category) => (
                    <Accordion
                        key={category.id}
                        type="single"
                        collapsible
                        className="w-full"
                    >
                        <AccordionItem
                            value={category.id}
                            className="px-4 py-2 bg-slate-700 text-[#F4F6F8] rounded-lg overflow-hidden shadow-dark-200"
                        >
                            <AccordionTrigger className="text-lg font-semibold px-4 py-2 flex items-center justify-between w-full">
                                <div className="flex space-x-2">
                                    <p className="text-[#56CCF2]">
                                        Category
                                    </p>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="text-sm text-[#DCE3F1]">
                                <ul className="px-6 py-4 space-y-4 bg-slate-600 rounded-lg shadow">
                                    {post.categories.map((category) => (
                                        <li key={category.id}>
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </section>
    )
}

export default Page
