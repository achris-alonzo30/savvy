"use client";

import { TransactionForm, FormValues, ApiFormValues } from "./transaction-form";
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

    const isLoading = transactionQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending;

    const onSubmit = (values: ApiFormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => setIsOpen(false)
        });
    }

    const handleDelete = () => {
        deleteMutation.mutate();
        setIsOpen(false);
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
                        <></>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}