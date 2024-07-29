"use client";

import { useState } from "react";
import { TransactionForm, ApiFormValues } from "./transaction-form";
import { useGetAccounts } from "@/actions/accounts/use-get-accounts";
import { useCreateAccount } from "@/actions/accounts/use-create-account";
import { useGetCategories } from "@/actions/categories/use-get-categories";
import { useCreateCategory } from "@/actions/categories/use-create-category";
import { useCreateTransaction } from "@/actions/transactions/use-create-transaction";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";


export const NewTransactionSheet = () => {

    const [isOpen, setIsOpen] = useState(false);
    const mutation = useCreateTransaction();

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();

    const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
    const categoryOptions = (categoryQuery.data ?? []).map((c) => ({
        label: c.name,
        value: c.id,
    }));


    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();

    const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    const accountOptions = (accountQuery.data ?? []).map((a) => ({
        label: a.name,
        value: a.id,
    }));

    const onSubmit = (values: ApiFormValues) => {
        mutation.mutate(values, {
            onSuccess: () => setIsOpen(false)
        });
    };

    const isPending = mutation.isPending || categoryMutation.isPending || accountMutation.isPending;
    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

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
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>
                        Create a new transaction to start tracking transactions.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <aside className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-6 text-muted-foreground animate-spin" />
                    </aside>
                ) : (
                    <TransactionForm
                        onSubmit={onSubmit}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                    />
                )}

            </SheetContent>
        </Sheet>
    )
}