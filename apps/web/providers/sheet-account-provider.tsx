"use client";

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/components/accounts/new-account-sheet";
import { EditAccountSheet } from "@/components/accounts/edit-account-sheet";

export const SheetAccountProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted()) return null;
    
    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
        </>

    )
}