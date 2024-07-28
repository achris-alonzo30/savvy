"use client";

import { z } from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { insertCategorySchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteCategoryDialog } from "./delete-category-dialog";

const formSchema = insertCategorySchema.pick({
    name: true
});

export type FormValues = z.infer<typeof formSchema>;
type CategoryFormProps = {
    id?: string;
    defaultValues: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export const CategoryForm = ({
    id,
    onSubmit,
    onDelete,
    defaultValues,
    disabled = false
}: CategoryFormProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    const handleDelete = () => onDelete?.();

    return (
        <>
            <DeleteCategoryDialog 
                isOpen={isOpen}
                disabled={disabled}
                setIsOpen={setIsOpen}
                deleteAccount={handleDelete}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={disabled}
                                        placeholder="e.g. Food, Travel, etc..."
                                    />
                                </FormControl>
                                <FormDescription>
                                    The name of the category
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={disabled}>
                        {id ? "Save Changes" : "Create Category"}
                    </Button>
                    {!!id && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled={disabled}
                            onClick={() => setIsOpen(true)}
                        >
                            <Trash className="size-5 pr-2" />
                            Delete Category
                        </Button>
                    )}
                </form>
            </Form>
        </>
    )
}