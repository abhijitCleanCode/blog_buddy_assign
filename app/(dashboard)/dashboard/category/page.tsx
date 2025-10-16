"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

import dynamic from "next/dynamic";
import { SkeletonCard } from "@/components/skeleton";
import AnimatedModal from "@/components/AnimatedModal";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from "@/lib/trpc/trpc-client";
import { Form } from "@/components/ui/form";
import { toast } from "react-toastify";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/lib/helper";

const LazyViewCategory = dynamic(() => import("@/components/dashboard/pages/category/ViewCategory"), {
    ssr: false,
    loading: () => <SkeletonCard />,
})

interface handleSubmitDataProps {
    name: string;
    description: string;
}

const formSchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
    description: z.string().min(3, "Category description must be at least 3 characters"),
})

const Page = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        }
    })

    // for cache invalidation
    const utils = trpc.useUtils();

    const { mutate: createCategory, isPending, isSuccess, error } = trpc.categories.create.useMutation({
        onSuccess: () => {
            utils.categories.getAll.invalidate();
            toast.success("Category created!");
            form.reset();
            setOpenModal(false);
        }
    })

    const handleSubmit = async (data: handleSubmitDataProps) => {
        createCategory(data);
    }

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
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="mt-6 space-y-6 flex flex-col justify-center"
                    >
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="name"
                            label="Enter category name"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="description"
                            label="Enter category description"
                        />

                        <Button
                            type="submit"
                            className="bg-blue-100 text-white hover:bg-blue-600"
                            disabled={isPending}
                        >
                            {isPending ? <Loader2 className='animate-spin' /> : "Create"}
                        </Button>
                    </form>
                </Form>
            </AnimatedModal>
        </>
    )
}

export default Page;
