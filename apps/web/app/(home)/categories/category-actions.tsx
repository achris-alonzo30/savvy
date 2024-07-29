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
import { EditCategorySheet } from "@/components/categories/edit-category-sheet";
import { DeleteCategoryDialog } from "@/components/categories/delete-category-dialog";

export const CategoryActions = ({ id }: { id: string }) => {
    const [dropdownState, setDropdownState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [alertState, setAlertState] = useState(false);

    const deleteMutation = useDeleteCategory(id);

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

            <EditCategorySheet
                id={id}
                isOpen={editState}
                setIsOpen={setEditState}
            />
            <DeleteCategoryDialog
                isOpen={alertState}
                setIsOpen={setAlertState}
                disabled={deleteMutation.isPending}
                deleteAccount={() => deleteMutation.mutate()}
            />
        </>
    );
};
