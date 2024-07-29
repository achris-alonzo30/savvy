"use client";

import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type DeleteTransactionDialogProps = {
    isOpen: boolean;
    disabled?: boolean;
    deleteAccount: () => void;
    setIsOpen: (isOpen: boolean) => void;
}

export const DeleteTransactionDialog = ({
    isOpen,
    disabled,
    setIsOpen,
    deleteAccount
}: DeleteTransactionDialogProps) => {
    const handleDelete = () => {
        deleteAccount();
        setIsOpen(false);
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        transactions and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={disabled}
                        onClick={handleDelete}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}