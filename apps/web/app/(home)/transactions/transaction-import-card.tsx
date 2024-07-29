"use client";

import { useState } from "react";
import { format, parse } from "date-fns";
import { convertAmtToMilUnits } from "@/lib/utils";

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
}: TransactionImportCardProps) => {
    const [selectedColumn, setSelectedColumn] = useState<SelectedColumnState>({});

    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
        setSelectedColumn((prev) => {
            const newSelectedColumns = { ...prev };
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

    const progress = Object.values(selectedColumn).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        };

        // Create a new array to store the selected columns
        const mappedData = {
            headers: headers.map((_h, i) => {
                const columnIndex = getColumnIndex(`column_${i}`);
                return selectedColumn[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((r, i) => {
                    const columnIndex = getColumnIndex(`column_${i}`);
                    return selectedColumn[`column_${columnIndex}`] ? r : null;
                });

                return transformedRow.every((item) => item === null) ? [] : transformedRow;
            }).filter((row) => row.length > 0)
        }

        // filter out the without null values
        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if (header !== null) {
                    acc[header] = cell;
                }

                return acc;
            }, [])
        });

        const formattedData = arrayOfData.map((row) => ({
            ...row,
            amount: convertAmtToMilUnits(parseFloat(row.amount)),
            date: format(parse(row.date, dateFormat, new Date()), outputFormat)
        }));

        return onSubmit(formattedData);
    }

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Import Transactions
                </CardTitle>
                <aside className="flex flex-col lg:flex-row items-center gap-2">
                    <Button
                        size="sm"
                        onClick={onCancel}
                        className="w-full lg:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleContinue}
                        className="w-full lg:w-auto"
                        disabled={progress < requiredOptions.length}
                    >
                        Continue ({progress} / {requiredOptions.length})
                    </Button>
                </aside>

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