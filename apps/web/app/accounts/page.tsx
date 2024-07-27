"use client";

import { 
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useNewAccount } from "@/hooks/use-new-account";
import { Plus } from "lucide-react";

const AccountPage = () => {
    const { onOpen } = useNewAccount();
    return (
        <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts
                    </CardTitle>
                    <Button 
                        size="sm"
                        onClick={onOpen}
                    >
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>
            </Card>
        </main>
    )
}

export default AccountPage;