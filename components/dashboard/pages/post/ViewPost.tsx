"use client"

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/lib/trpc/trpc-client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Loader2, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import AnimatedModal from '@/components/AnimatedModal';
import { useRouter } from 'next/navigation';

const ViewPost = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    const router = useRouter();

    const { data: posts } = trpc.post.getAll.useQuery(undefined, { suspense: true });
    console.log(posts);

    const utils = trpc.useUtils();

    const { mutate: deletePost, isPending: isDeletingPost } = trpc.post.delete.useMutation({
        onSuccess: () => {
            utils.post.getAll.invalidate();
            toast.success("Post deleted!");
            setOpenModal(false);
        },
        onError: (error) => {
            toast.error(error.message ?? "Failed to delete post!");
        },
    })

    const handleConfirmDelete = () => {
        if (selectedPostId) {
            deletePost({ id: selectedPostId });
        }
    };

    return (
        <>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts?.map((post) => (
                        <Card key={post.id} className="cursor-pointer border bg-white/60 backdrop-blur-sm hover:bg-white/70">
                            <CardContent className='p-5'>
                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <h4 className='font-semibold text-dark-700 leading-tight'>
                                            {post.title}
                                        </h4>

                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => {
                                                    setSelectedPostId(post.id);
                                                    setOpenModal(true);
                                                }}
                                                variant="outline"
                                                size="icon"
                                                className="border border-rose-500"
                                            >
                                                <Trash className="text-rose-500" />
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    router.push(`/dashboard/post/${post.id}`);
                                                }}
                                                variant="outline"
                                                size="icon"
                                                className="border border-green-500"
                                            >
                                                <Eye className="text-green-500" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge className="text-xs bg-neutral-50 hover:bg-neutral-50 text-dark-700 border-neutral-200/50 backdrop-blur-sm">
                                            slug: {post.slug}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <AnimatedModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title='Are you absolutely sure?'
            >
                <div className="space-y-4">
                    <p className="text-sm text-dark-600">
                        This action cannot be undone. The selected category will be permanently deleted.
                    </p>

                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpenModal(false);
                                setSelectedPostId(null);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeletingPost}
                        >
                            {isDeletingPost ? <Loader2 className="animate-spin" /> : "Confirm"}
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </>
    )
}

export default ViewPost;
