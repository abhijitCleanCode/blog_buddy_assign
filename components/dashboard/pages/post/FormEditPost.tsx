import React, { useState } from 'react'

// form imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/lib/helper";
import { trpc } from '@/lib/trpc/trpc-client';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MultiSelect from '@/components/MultiSelect';
import Editor from '@/components/editor/Editor';

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string | null;
}

interface PostCategory {
  postId: string;
  categoryId: string;
  category: Category;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string | null;
  categories: Category[];
  postCategories: PostCategory[];
}

interface FormEditPostProps {
  post: Post | null | undefined;
}


const formSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    published: z.boolean().optional(),
    categoryIds: z.array(z.string()).nonempty("Select at least one category"),
});

const FormEditPost = ({ post }: FormEditPostProps) => {
    const [submitType, setSubmitType] = useState<"draft" | "publish">(
        post?.published ? "publish" : "draft"
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: post?.title,
            content: post?.content,
            published: post?.published,
            categoryIds: post?.postCategories?.map((pc: { categoryId: string }) => pc.categoryId) ?? [],
        },
    });

    // Categories
    const { data: categories, isLoading: loadingCategories } =
        trpc.categories.getAll.useQuery(undefined, { suspense: true });

    const optionsAllCategory = categories?.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    // Mutation
    const utils = trpc.useUtils();
    const { mutate: updatePost, isPending } = trpc.post.update.useMutation({
        onSuccess: () => {
            utils.post.getAll.invalidate();
            toast.success("Post updated successfully!");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update post");
        },
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        updatePost({
            id: post?.id ?? "",
            ...data,
            published: submitType === "publish",
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mt-6 space-y-6 flex flex-col justify-center w-full md:w-1/2"
            >
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="title"
                    label="Post title"
                />

                <div className="h-[512px] overflow-y-auto">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full gap-3">
                                <FormLabel>Content</FormLabel>
                                <FormControl className="mt-2">
                                    <Editor value={field.value} fieldChange={field.onChange} />
                                </FormControl>
                                <FormMessage className="text-rose-500 animate-pulse" />
                            </FormItem>
                        )}
                    />
                </div>

                <Controller
                    name="categoryIds"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <MultiSelect
                                label="Select categories"
                                placeholder="Choose categories"
                                options={optionsAllCategory ?? []}
                                selectedOptions={(optionsAllCategory ?? []).filter((opt) =>
                                    field.value.includes(opt.value)
                                )}
                                setSelectedOptions={(selected) => {
                                    field.onChange(selected.map((opt) => opt.value));
                                }}
                                disabled={loadingCategories}
                            />
                            {form.formState.errors.categoryIds && (
                                <p className="text-rose-500 animate-pulse text-sm mt-1">
                                    {form.formState.errors.categoryIds.message}
                                </p>
                            )}
                        </>
                    )}
                />

                <div className="flex items-center gap-4">
                    {/* Save as Draft */}
                    <Button
                        type="submit"
                        className="bg-gray-700 text-white hover:bg-gray-800"
                        disabled={isPending}
                        onClick={() => setSubmitType("draft")}
                    >
                        {isPending && submitType === "draft" ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Save as Draft"
                        )}
                    </Button>

                    {/* Update Post */}
                    <Button
                        type="submit"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        disabled={isPending}
                        onClick={() => setSubmitType("publish")}
                    >
                        {isPending && submitType === "publish" ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Update Post"
                        )}
                    </Button>

                    {/* ✅ New Publish Button */}
                    {!post?.published && (
                        <Button
                            type="button"
                            className="bg-green-600 text-white hover:bg-green-700"
                            disabled={isPending}
                            onClick={() => {
                                const data = form.getValues();
                                updatePost({
                                    id: post?.id ?? "",
                                    ...data,
                                    published: true,
                                });
                                toast.success("Post published successfully!");
                            }}
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Publish"
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default FormEditPost
