"use client";

import { useState } from "react";
import { transactions as transactionsSchema } from "@/db/schema";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { LoadingScreen } from "./loading-screen";
import { DataTable } from "@/components/data-table";
import { UploadButton } from "@/components/upload-button";
import { transactionColumns } from "./transaction-columns";
import { TransactionImportCard } from "./transaction-import-card";
import { useGetTransactions } from "@/actions/transactions/use-get-transactions";
import { NewTransactionSheet } from "@/components/transactions/new-transaction-sheet";
import { useBulkDeleteTransactions } from "@/actions/transactions/use-bulk-delete-transactions";
import { SelectAccountDialog } from "./select-account-dialog";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {}
}

const TransactionPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [accountId, setAccountId] = useState<string>("");
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState<typeof INITIAL_IMPORT_RESULTS>(INITIAL_IMPORT_RESULTS);

    const transactionQuery = useGetTransactions();
    const deleteTransactions = useBulkDeleteTransactions();

    const transactions = transactionQuery.data || [];
    const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }

    const onSubmitImport = async (values: typeof transactionsSchema.$inferInsert[]) => {
        
    }

    // TODO: Create Bulk Create Transaction after importing csv files
    if (transactionQuery.isLoading) return <LoadingScreen />;
    console.log(variant)
    if (variant === VARIANTS.IMPORT) {
        return (
            <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <SelectAccountDialog
                    setAccountId={setAccountId}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                />
                <TransactionImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onCancelImport}
                />
            </main>
        )
    }

    return (
        <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transactions
                    </CardTitle>
                    <aside className="flex flex-col lg:flex-row items-center gap-2">
                        <UploadButton onUpload={onUpload}/>
                        <NewTransactionSheet />
                    </aside>
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