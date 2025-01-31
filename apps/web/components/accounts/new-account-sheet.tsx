"use client";

import { useState } from "react";
import { AccountForm, FormValues } from "./account-form";
import { useCreateAccount } from "@/actions/accounts/use-create-account";

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export const NewAccountSheet = () => {

    const [isOpen, setIsOpen] = useState(false);
    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => setIsOpen(false)
        });
    }

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
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to start tracking transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    disabled={mutation.isPending}
                    onSubmit={onSubmit}
                    defaultValues={{ name: "" }}
                />
            </SheetContent>
        </Sheet>
    )
}