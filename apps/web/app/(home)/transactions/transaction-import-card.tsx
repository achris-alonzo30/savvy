"use client";

import { useState } from "react";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionImportTable } from "./transaction-import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount", "date", "payee"
]

export interface SelectedColumnState {
    [key: string]: string | null;
}


type TransactionImportCardProps = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}
export const TransactionImportCard = ({
    data,
    onCancel,
    onSubmit
} : TransactionImportCardProps ) => {
    const [selectedColumn, setSelectedColumn] = useState<SelectedColumnState>({});

    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
        setSelectedColumn((prev) => {
            const newSelectedColumns = {...prev};
            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if (value === "skip") value = null;

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        })
    }

    return (
        <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transactions
                    </CardTitle>
                    <Button
                        size="sm"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </CardHeader>
                <CardContent>
                    <TransactionImportTable 
                        body={body}
                        headers={headers}
                        selectedColumn={selectedColumn}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
        </Card>
    )
}