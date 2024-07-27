import {
    Sheet,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { useNewAccount } from "@/hooks/use-new-account";
import { AccountForm, FormValues } from "./account-form";
import { useCreateAccount } from "@/actions/accounts/use-create-account";

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        
    }

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
                    disabled={false}
                    onSubmit={onSubmit} 
                    defaultValues={{ name: "" }}  
                />
            </SheetContent>
        </Sheet>
    )
}