"use client";

import { useConfirm } from "@/hooks/use-confirm-delete";
import { AccountForm, FormValues } from "./account-form";
import { useOpenAccount } from "@/hooks/use-open-account";
import { useGetAccount } from "@/actions/accounts/use-get-account";
import { useEditAccount } from "@/actions/accounts/use-edit-account";

import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { useDeleteAccount } from "@/actions/accounts/use-delete-account";



export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm("Are you sure you want to delete this account?", "Deleting an account cannot be undone.");

    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isLoading = accountQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => onClose()
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) deleteMutation.mutate(undefined, {
            onSuccess: () => onClose()
        })
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : { name: "" }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
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
                            onDelete={onDelete}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}