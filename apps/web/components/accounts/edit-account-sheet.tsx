"use client";

import { AccountForm, FormValues } from "./account-form";
import { useGetAccount } from "@/actions/accounts/use-get-account";
import { useEditAccount } from "@/actions/accounts/use-edit-account";

import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useDeleteAccount } from "@/actions/accounts/use-delete-account";

type EditAccountSheetProps = {
    id: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const EditAccountSheet = ({ 
    id,
    isOpen, 
    setIsOpen,
}: EditAccountSheetProps) => {
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isLoading = accountQuery.isLoading;
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

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : { name: "" }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="space-y-4 ">
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>
                            Edit an existing account.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </span>
                    ) : (
                        <AccountForm
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