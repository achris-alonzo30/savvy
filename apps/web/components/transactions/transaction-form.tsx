"use client";

import { z } from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { insertTransactionSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Select } from "../select";
import { Button } from "@/components/ui/button";
import { DeleteTransactionDialog } from "./delete-transaction-dialog";
import { DatePicker } from "../date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";



const formSchema = z.object({
    payee: z.string(),
    amount: z.number(),
    date: z.coerce.date(),
    accountId: z.string(),
    notes: z.string().nullable().optional(),
    categoryId: z.string().nullable().optional(),
});


const apiSchema = insertTransactionSchema.omit({ id: true });

export type FormValues = z.infer<typeof formSchema>;
export type ApiFormValues = z.input<typeof apiSchema>

type TransactionFormProps = {
    id?: string;
    disabled?: boolean;
    onDelete?: () => void;
    defaultValues: FormValues;
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
    onSubmit: (values: ApiFormValues) => void;
    accountOptions: { label: string, value: string }[];
    categoryOptions: { label: string, value: string }[];
}

export const TransactionForm = ({
    id,
    onSubmit,
    onDelete,
    disabled,
    defaultValues,
    accountOptions,
    categoryOptions,
    onCreateCategory,
    onCreateAccount,
}: TransactionFormProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }

    const handleDelete = () => onDelete?.();

    return (
        <>
            <DeleteTransactionDialog
                isOpen={isOpen}
                disabled={disabled}
                setIsOpen={setIsOpen}
                deleteAccount={handleDelete}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                    <FormField
                        name="date"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transaction Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        disabled={disabled}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="accountId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Select an account"
                                        options={accountOptions}
                                        onCreate={onCreateAccount}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="categoryId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Select an category"
                                        options={categoryOptions}
                                        onCreate={onCreateCategory}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="payee"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payee</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={disabled}
                                        placeholder="Add a payee..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="payee"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payee</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={disabled}
                                        placeholder="Add a payee..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="notes"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        rows={5}
                                        value={field.value || ""}
                                        placeholder="(Optional) Add a note..."
                                    ></Textarea>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={disabled}>
                        {id ? "Save Changes" : "Create Transaction"}
                    </Button>
                    {!!id && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled={disabled}
                            onClick={() => setIsOpen(true)}
                        >
                            <Trash className="size-5 pr-2" />
                            Delete Transaction
                        </Button>
                    )}
                </form>
            </Form>
        </>
    )
}