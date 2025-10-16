"use client"

import React from 'react'

// form imports
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/CustomFormField';
import { FormFieldType } from '@/lib/helper';

import { trpc } from '@/lib/trpc/trpc-client';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface handleSubmitDataProps {
    name: string;
    description: string;
}

const formSchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
    description: z.string().min(3, "Category description must be at least 3 characters"),
})

const FormAddCategory = () => {

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
        }
    })

    const handleSubmit = async (data: handleSubmitDataProps) => {
        createCategory(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='mt-6 space-y-6 flex flex-col justify-center'
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
    )
}

export default FormAddCategory
