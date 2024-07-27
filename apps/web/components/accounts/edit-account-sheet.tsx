"use client";

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



export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const accountQuery = useGetAccount(id);
    const mutation = useEditAccount(id);

    const isPending = mutation.isPending;
    const isLoading = accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => onClose()
        });
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : { name: "" }

    return (
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
                        onSubmit={onSubmit}
                        disabled={isPending}
                        defaultValues={defaultValues}
                    />
                )}
            </SheetContent>
        </Sheet>
    )
}