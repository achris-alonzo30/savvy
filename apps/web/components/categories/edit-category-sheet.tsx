"use client";

import { CategoryForm, FormValues } from "./category-form";
import { useGetCategory } from "@/actions/categories/use-get-category";
import { useEditCategory } from "@/actions/categories/use-edit-category";
import { useDeleteCategory } from "@/actions/categories/use-delete-category";

import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";


type EditCategorySheetProps = {
    id: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const EditCategorySheet = ({ 
    id,
    isOpen, 
    setIsOpen,
}: EditCategorySheetProps) => {
    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isLoading = categoryQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => setIsOpen(false)
        });
    }

    const handleDelete = () => {
        deleteMutation.mutate();
        setIsOpen(false);
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    } : { name: "" }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="space-y-4 ">
                    <SheetHeader>
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>
                            Edit an existing category.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </span>
                    ) : (
                        <CategoryForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            onDelete={handleDelete}
                            defaultValues={defaultValues}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}