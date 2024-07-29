"use client";

import { useRef } from "react";
import { useGetAccounts } from "@/actions/accounts/use-get-accounts";
import { useCreateAccount } from "@/actions/accounts/use-create-account";

import { 
    Dialog,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogDescription,
 } from "@/components/ui/dialog";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";

type SelectAccountDialogProps = {
    isOpen: boolean;
    setAccountId: (accountId: string) => void;
    setIsOpen: (isOpen: boolean) => void;
}

export const SelectAccountDialog = ({
    isOpen,
    setIsOpen,
    setAccountId,
} : SelectAccountDialogProps ) => {
    const selectValueRef = useRef<string>();

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();

    const onCreateAccount = (name: string) => accountMutation.mutate({ name });

    const accountOptions = (accountQuery.data ?? []).map(a => ({
        label: a.name,
        value: a.id
    }));

    const onSubmit = () => {
        if (selectValueRef.current) {
            onCreateAccount(selectValueRef.current);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Account</DialogTitle>
                    <DialogDescription>Please select an account to continue.</DialogDescription>
                </DialogHeader>
                <Select
                    placeholder="Select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => selectValueRef.current = value}
                    disabled={accountQuery.isLoading || accountMutation.isPending}
                />
                <DialogFooter className="pt-2">
                    <Button
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}