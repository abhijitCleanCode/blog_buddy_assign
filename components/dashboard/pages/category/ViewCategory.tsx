"use client"

import React, { useState } from "react";
import AnimatedModal from "@/components/AnimatedModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/trpc-client";
import { Edit, Loader2, Trash } from "lucide-react";
import { toast } from "react-toastify";
import FormEditCategory from "./FormEditCategory";

type Category = {
    id: string;
    name: string;
    description?: string;
};

function addEllipses(str: string, maxLength: number) {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}

const ViewCategory = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data: categories, isLoading: loadingCategories } =
        trpc.categories.getAll.useQuery();
    console.log(categories);

    const utils = trpc.useUtils();

    const { mutate: deleteCategory, isPending: isDeleting } =
        trpc.categories.delete.useMutation({
            onSuccess: () => {
                utils.categories.getAll.invalidate();
                toast.success("Category deleted!");
                setOpenModal(false);
            },
            onError: (error) => {
                toast.error(error.message ?? "Failed to delete category!");
            },
        });

    const handleConfirmDelete = () => {
        if (selectedCategoryId) {
            deleteCategory({ id: selectedCategoryId });
        }
    };

    const { mutate: updateCategory, isPending: isUpdating } = trpc.categories.update.useMutation({
        onSuccess: () => {
            utils.categories.getAll.invalidate();
            toast.success("Category updated!");
            setEditingCategory(null);
        },
        onError: (error) => {
            toast.error(error.message ?? "Failed to update category!");
        },
    })

    const handleUpdateCategory = (data: Category) => {
        if (editingCategory) {
            updateCategory({ ...data, id: editingCategory.id });
        }
    }

    return (
        <>
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories?.map((category) => (
                        <div key={category.id}>
                            <Card className="cursor-pointer border bg-white/60 backdrop-blur-sm hover:bg-white/70">
                                <CardContent className="p-5">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-dark-700 leading-tight">
                                                {category.name}
                                            </h4>

                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => setEditingCategory(category)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="border border-blue-100"
                                                >
                                                    <Edit className="text-blue-100" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setSelectedCategoryId(category.id);
                                                        setOpenModal(true);
                                                    }}
                                                    variant="outline"
                                                    size="icon"
                                                    className="border border-rose-500"
                                                >
                                                    <Trash className="text-rose-500" />
                                                </Button>
                                            </div>
                                        </div>

                                        {category.description && (
                                            <p className="text-sm text-dark-600 leading-relaxed">
                                                {addEllipses(category.description, 100)}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="text-xs bg-neutral-50 hover:bg-neutral-50 text-dark-700 border-neutral-200/50 backdrop-blur-sm">
                                                slug: {category.slug}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>

            <AnimatedModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Are you absolutely sure?"
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
                                setSelectedCategoryId(null);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? <Loader2 className="animate-spin" /> : "Confirm"}
                        </Button>
                    </div>
                </div>
            </AnimatedModal>

            <AnimatedModal
                openModal={!!editingCategory}
                setOpenModal={() => setEditingCategory(null)}
                title="Edit Category"
            >
                {editingCategory && (
                    <FormEditCategory
                        category={editingCategory}
                    />
                )}
            </AnimatedModal>
        </>
    );
};

export default ViewCategory;
