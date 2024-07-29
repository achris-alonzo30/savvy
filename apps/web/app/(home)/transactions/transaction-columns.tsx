"use client"

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TransactionActions } from "./transaction-actions";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0];

export const transactionColumns: ColumnDef<ResponseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 py-0 border-none hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("date") as Date;
            return (
                <span>{format(date, "yyyy-MM-dd")}</span>
            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 py-0 border-none hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "payee",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 py-0 border-none hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 py-0 border-none hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));

            return (
                <Badge
                    variant={amount < 0 ? "destructive" : "primary"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {formatCurrency(amount)}
                </Badge>
            )
        }

    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 py-0 border-none hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));

            return (
                <span>{formatCurrency(amount)}</span>
            )
        }

    },
    {
        accessorKey: "account",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 py-0 border-none hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Account
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        header: () => <p className="pl-2">Actions</p>,
        cell: ({ row }) => <TransactionActions id={row.original.id} />
    }
]
