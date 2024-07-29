"use client";

import { accountColumns } from "./account-columns";
import { useGetAccounts } from "@/actions/accounts/use-get-accounts";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { LoadingScreen } from "./loading-screen";
import { DataTable } from "@/components/data-table";
import { useBulkDeleteAccounts } from "@/actions/accounts/use-bulk-delete-accounts";
import { NewAccountSheet } from "@/components/accounts/new-account-sheet";

const AccountPage = () => {
    const accountsQuery = useGetAccounts();
    const deleteAccounts = useBulkDeleteAccounts();

    const accounts = accountsQuery.data || [];
    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

    if (accountsQuery.isLoading) return <LoadingScreen />;

    return (
        <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts
                    </CardTitle>
                    <NewAccountSheet />
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={accounts}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteAccounts.mutate({ ids });
                        }}
                        disabled={isDisabled}
                        columns={accountColumns}
                    />
                </CardContent>
            </Card>
        </main>
    )
}

export default AccountPage;