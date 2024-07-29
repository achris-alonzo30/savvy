"use client";

import { useState } from "react";
import { useDeleteCategory } from "@/actions/categories/use-delete-category";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteTransaction } from "@/actions/transactions/use-delete-transaction";
import { EditTransactionSheet } from "@/components/transactions/edit-transaction-sheet";
import { DeleteTransactionDialog } from "@/components/transactions/delete-transaction-dialog";

export const TransactionActions = ({ id }: { id: string }) => {
    const [dropdownState, setDropdownState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [alertState, setAlertState] = useState(false);

    const deleteMutation = useDeleteTransaction(id);

    return (
        <>
            <DropdownMenu open={dropdownState} onOpenChange={setDropdownState}>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 p-0"
                    >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Dropdown Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => {
                            setDropdownState(false);
                            setEditState(true);
                        }}
                    >
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setDropdownState(false);
                            setAlertState(true);
                        }}
                    >
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <EditTransactionSheet
                id={id}
                isOpen={editState}
                setIsOpen={setEditState}
            />
            <DeleteTransactionDialog
                isOpen={alertState}
                setIsOpen={setAlertState}
                disabled={deleteMutation.isPending}
                deleteAccount={() => deleteMutation.mutate()}
            />
        </>
    );
};
