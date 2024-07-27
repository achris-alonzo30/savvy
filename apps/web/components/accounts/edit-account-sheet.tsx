import {
    Sheet,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { useOpenAccount } from "@/hooks/use-open-account";
import { AccountForm, FormValues } from "./account-form";
import { useGetAccount } from "@/actions/accounts/use-get-account";
import { useCreateAccount } from "@/actions/accounts/use-create-account";
import { Loader2 } from "lucide-react";
import { except } from 'drizzle-orm/pg-core';


export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const accountQuery = useGetAccount(id);

    const mutation = useCreateAccount();

    const isLoading = accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => onClose()
        });
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : { name: "" }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 ">
                <SheetHeader>
                    <SheetTitle>Edit Account</SheetTitle>
                    <SheetDescription>
                        Edit an existing account.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </span>
                ) : (
                    <AccountForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={mutation.isPending}
                        defaultValues={defaultValues}
                    />
                )}

            </SheetContent>
        </Sheet>
    )
}