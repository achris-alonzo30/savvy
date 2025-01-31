"use client";

import { useState } from "react";
import { CategoryForm, FormValues } from "./category-form";
import { useCreateCategory } from "@/actions/categories/use-create-category";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";


export const NewCategorySheet = () => {

    const [isOpen, setIsOpen] = useState(false);
    const mutation = useCreateCategory();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => setIsOpen(false)
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                >
                    <Plus className="size-4 mr-2" />
                    Add New
                </Button>
            </SheetTrigger>
            <SheetContent className="space-y-4 ">
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>
                        Create a new category to start tracking transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    disabled={mutation.isPending}
                    onSubmit={onSubmit}
                    defaultValues={{ name: "" }}
                />
            </SheetContent>
        </Sheet>
    )
}