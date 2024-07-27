"use client";


import { 
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import { useOpenAccount } from "@/hooks/use-open-account";
export const AccountActions = ({ id }: { id: string }) => {
    const { onOpen, onClose } = useOpenAccount();

    return (
        <DropdownMenu onOpenChange={onClose}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Dropdown Menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
                    <Edit className="size-4 mr-2" />
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>  
        </DropdownMenu>
    )
}