"use client";

import { transactionColumns } from "./transaction-columns";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { LoadingScreen } from "./loading-screen";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/actions/transactions/use-get-transactions";
import { NewTransactionSheet } from "@/components/transactions/new-transaction-sheet";
import { useBulkDeleteTransactions } from "@/actions/transactions/use-bulk-delete-transactions";



const TransactionPage = () => {
    const transactionQuery = useGetTransactions();
    const deleteTransactions = useBulkDeleteTransactions();

    const transactions = transactionQuery.data || [];
    const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

    if (transactionQuery.isLoading) return <LoadingScreen />;

    return (
        <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transactions
                    </CardTitle>
                    <NewTransactionSheet />
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={transactions}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ ids });
                        }}
                        disabled={isDisabled}
                        columns={transactionColumns}
                    />
                </CardContent>
            </Card>
        </main>
    )
}

export default TransactionPage;