import { useState } from "react";
import type { ComponentType, ReactNode } from "react";

import type {
    Control,
    ControllerRenderProps,
    FieldValues,
    Path,
} from 'react-hook-form';

import { FormFieldType } from "@/lib/helper";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface CustomFormFieldProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    fieldType: FormFieldType;
    name: Path<T>;
    label: string;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    children?: React.ReactNode;
}

interface RenderFieldProps<T extends FieldValues = FieldValues> {
    field: ControllerRenderProps<T, Path<T>>;
    fieldType: FormFieldType;
    IconComponent?: ComponentType<{
        height?: number;
        width?: number;
        className?: string;
        color?: string;
    }>;
    placeholder?: string;
    dateFormat?: string;
    showTimeSelect?: boolean;
    renderSekeleton?: ReactNode;
    type?: string;
    disabled?: boolean;
    children?: ReactNode;
    name?: string;
    label?: string;
}

export const RenderField = <T extends FieldValues>({
    field,
    fieldType,
    IconComponent,
    placeholder,
    type = "text",
    disabled,
    children,
    name,
    label,
}: RenderFieldProps<T>) => {
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex items-center rounded-md border border-dark-700">
                    {IconComponent && (
                        <IconComponent
                            height={24}
                            width={24}
                            className="ml-2"
                            color="#76828D"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type={type}
                            {...field}
                            className="shad-input border-0"
                            disabled={disabled}
                        />
                    </FormControl>
                </div>
            )

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={disabled}
                        rows={5}
                    />
                </FormControl>
            )

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="shad-select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent className="shad-select-content">
                            {children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )

        default:
            return null;
    }
}

const CustomFormField = <T extends FieldValues>({
    control,
    fieldType,
    name,
    label,
    ...rest
}: CustomFormFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className="flex-1">
                        {fieldType !== FormFieldType.CHECKBOX && label && (
                            <FormLabel>{label}</FormLabel>
                        )}

                        <RenderField
                            field={field}
                            fieldType={fieldType}
                            label={label}
                            name={name}
                            {...rest}
                        />

                        <FormMessage className="text-[#EA6365] text-sm mt-1 animate-pulse" />
                    </FormItem>
                );
            }}
        />
    )
}

export default CustomFormField;
