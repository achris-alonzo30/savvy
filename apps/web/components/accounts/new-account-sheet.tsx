import {
    Sheet,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";

export const NewAccountSheet = () => {
    return (
        <Sheet open>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to start tracking transactions.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}