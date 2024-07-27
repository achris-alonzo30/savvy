"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/hooks/use-new-account";

const HomePage = () => {
    const { onOpen, onClose} = useNewAccount();
    return (
        <Button onClick={onOpen}>
            Open Account
        </Button>
    )
}

export default HomePage;