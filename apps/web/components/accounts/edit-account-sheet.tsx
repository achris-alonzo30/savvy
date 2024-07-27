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


export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const accountQuery = useGetAccount(id);

    const mutation = useCreateAccount();

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
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to start tracking transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={defaultValues}
                />
            </SheetContent>
        </Sheet>
    )
}