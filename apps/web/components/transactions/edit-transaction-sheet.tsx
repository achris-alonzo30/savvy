"use client";

import { TransactionForm, ApiFormValues } from "./transaction-form";
import { useGetAccounts } from "@/actions/accounts/use-get-accounts";
import { useCreateAccount } from "@/actions/accounts/use-create-account";
import { useGetCategories } from "@/actions/categories/use-get-categories";
import { useCreateCategory } from "@/actions/categories/use-create-category";
import { useGetTransaction } from "@/actions/transactions/use-get-transaction";
import { useEditTransaction } from "@/actions/transactions/use-edit-transaction";
import { useDeleteTransaction } from "@/actions/transactions/use-delete-transaction";

import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";


type EditTransactionSheetProps = {
    id: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const EditTransactionSheet = ({
    id,
    isOpen,
    setIsOpen,
}: EditTransactionSheetProps) => {

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

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

    const isLoading = 
        transactionQuery.isLoading || 
        categoryQuery.isLoading || 
        accountQuery.isLoading;
        
    const isPending = 
        editMutation.isPending || 
        deleteMutation.isPending || 
        transactionQuery.isPending ||
        categoryMutation.isPending || 
        accountMutation.isPending;

    const onSubmit = (values: ApiFormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => setIsOpen(false)
        });
    }

    const onDelete = () => {
        deleteMutation.mutate();
        setIsOpen(false);
    }

    const defaultValues = transactionQuery.data ? {
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
        accountId: transactionQuery.data.accountId,
        category: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
    } : {
        payee: "",
        notes: "",
        accountId: "",
        category: "",
        amount: "",
        date: new Date(),
    }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="space-y-4 ">
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>
                            Edit an existing transaction.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </span>
                    ) : (
                        <TransactionForm
                            id={id}
                            onDelete={onDelete}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}