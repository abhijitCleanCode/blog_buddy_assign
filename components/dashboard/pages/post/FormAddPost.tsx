"use client";

import React, { useState } from "react";

// form imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/lib/helper";

import { trpc } from "@/lib/trpc/trpc-client";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SelectItem } from "@/components/ui/select";
import MultiSelect from "@/components/MultiSelect";
import Editor from "@/components/editor/Editor";

const formSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  published: z.boolean().optional(),
  categoryIds: z.array(z.string()).nonempty("Select at least one category"),
});

const FormAddPost = () => {
  const [submitType, setSubmitType] = useState<"draft" | "publish">("publish");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
      categoryIds: [],
    },
  });

  // get all categories
  const { data: categories, isLoading: loadingCategories } =
    trpc.categories.getAll.useQuery(undefined, { suspense: true });
  const optionsAllCategory = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // for cache invalidation
  const utils = trpc.useUtils();

  const { mutate: createPost, isPending } = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      toast.success("Post created!");
      form.reset();
      // also close the modal and for that receive the state from the parent
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    createPost({
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
          label="Enter post title"
        />

        <div className="h-[512px] overflow-y-auto">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="">Content</FormLabel>

                <FormControl className="mt-2">
                  <Editor
                    value={field.value}
                    fieldChange={field.onChange}
                  />
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

          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={isPending}
            onClick={() => setSubmitType("publish")}
          >
            {isPending && submitType === "publish" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Post"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormAddPost;
