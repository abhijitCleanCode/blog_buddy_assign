"use client"

import { trpc } from '@/lib/trpc/trpc-client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import Link from 'next/link'

function addEllipsis(text: string, maxLength: number) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const ViewBlogs = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const { data: categories } = trpc.categories.getAll.useQuery(undefined, {
        suspense: true,
    });


    const { data: posts } = trpc.post.getAll.useQuery(
        {
            published: true,
            categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
        },
        { suspense: true }
    );

    return (
        <section className=''>
            <div className="flex items-center gap-3 mb-4">
                <label className="font-medium">Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 bg-tranparent text-sm w-full md:w-1/4"
                >
                    <option value="all">All</option>
                    {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {posts?.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                        <Card className="cursor-pointer border bg-white/60 backdrop-blur-sm hover:bg-white/70">
                            <CardContent className='p-5'>
                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <h4 className='font-semibold text-dark-700 leading-tight'>
                                            {addEllipsis(post.title, 30)}
                                        </h4>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge className="text-xs bg-neutral-50 hover:bg-neutral-50 text-dark-700 border-neutral-200/50 backdrop-blur-sm">
                                            slug: {post.slug}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ViewBlogs
