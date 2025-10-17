"use client";

import React from "react";

// form imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/lib/helper";

import MarkdownEditor from "@/components/editor/MarkdownEditor";
import { trpc } from "@/lib/trpc/trpc-client";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SelectItem } from "@/components/ui/select";
import MultiSelect from "@/components/MultiSelect";

const formSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  published: z.boolean().optional(),
  categoryIds: z.array(z.string()).nonempty("Select at least one category"),
});

const FormAddPost = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
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
    console.log(data);
    createPost(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-6 space-y-6 flex flex-col justify-center"
      >
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="title"
          label="Enter post title"
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            Content (Markdown)
          </label>
          <MarkdownEditor
            value={form.watch("content")}
            onChange={(val) => form.setValue("content", val)}
          />
          {form.formState.errors.content && (
            <p className="text-rose-500 text-sm mt-1">
              {form.formState.errors.content.message}
            </p>
          )}
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

        <Button
          type="submit"
          className="bg-blue-100 text-white hover:bg-blue-600"
        // disabled={isPending}
        >
          {/* {isPending ? <Loader2 className='animate-spin' /> : "Create"} */}
          Create
        </Button>
      </form>
    </Form>
  );
};

export default FormAddPost;
