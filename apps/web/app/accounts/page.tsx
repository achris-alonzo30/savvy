"use client";

import { accountColumns } from "./account-columns";
import { useNewAccount } from "@/hooks/use-new-account";
import { useGetAccounts } from "@/actions/accounts/use-get-accounts";

import { Loader2, Plus } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";


const AccountPage = () => {
    const { onOpen } = useNewAccount();
    const accountsQuery = useGetAccounts();

    const accounts = accountsQuery.data ?? [];

    if (accountsQuery.isLoading) {
        return (
            <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="">
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <aside className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-8 text-muted-foreground animate-spin" />
                        </aside>    
                    </CardContent>
                </Card>
            </main>
        )
    }

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
                <CardContent>
                    <DataTable
                        disabled
                        data={accounts}
                        filterKey="email"
                        onDelete={() => { }}
                        columns={accountColumns}
                    />
                </CardContent>
            </Card>
        </main>
    )
}

export default AccountPage;