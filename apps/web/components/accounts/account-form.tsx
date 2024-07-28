"use client";

import { z } from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { insertAccountSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteAccountDialog } from "./delete-account-dialog";

const formSchema = insertAccountSchema.pick({
    name: true
});

export type FormValues = z.infer<typeof formSchema>;
type AccountFormProps = {
    id?: string;
    defaultValues: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export const AccountForm = ({
    id,
    onSubmit,
    onDelete,
    defaultValues,
    disabled = false
}: AccountFormProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    const handleDelete = () => onDelete?.();
    return (
        <>
            <DeleteAccountDialog 
                isOpen={isOpen}
                disabled={disabled}
                setIsOpen={setIsOpen}
                deleteAccount={handleDelete}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={disabled}
                                        placeholder="e.g. Cash, Bank, Credit Card"
                                    />
                                </FormControl>
                                <FormDescription>
                                    The name of the account
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={disabled}>
                        {id ? "Save Changes" : "Create Account"}
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
                            Delete Account
                        </Button>
                    )}
                </form>
            </Form>
        </>
    )
}