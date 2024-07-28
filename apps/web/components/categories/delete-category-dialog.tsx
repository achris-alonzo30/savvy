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

type DeleteCategoryDialogProps = {
    isOpen: boolean;
    disabled: boolean;
    deleteAccount: () => void;
    setIsOpen: (isOpen: boolean) => void;
}

export const DeleteCategoryDialog = ({
    isOpen,
    disabled,
    setIsOpen,
    deleteAccount
}: DeleteCategoryDialogProps) => {
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
                        category and remove your data from our servers.
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