"use client";

import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import { PanelLeft } from "lucide-react";

import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet"
import { NavButton } from "./nav-button";
import { Button } from "@/components/ui/button";

const routes = [
    {
        href: "/",
        label: "Overview"
    },
    {
        href: "/transactions",
        label: "Transactions"
    },
    {
        href: "/accounts",
        label: "Accounts"
    },
    {
        href: "/categories",
        label: "Categories"
    },
    {
        href: "/settings",
        label: "Settings"
    }
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false);


    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }
   
    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                        className="font-normal group bg-white/10 hover:bg-white/20 hover:text-white py-1 px-1 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-zinc-50 focus:bg-white/30 transition-colors"
                    >
                        <PanelLeft className="size-6 text-zinc-200 group-hover:text-white" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((r, i) => (
                            <Button
                                key={i}
                                size="sm"
                                onClick={() => onClick(r.href)}
                                className="w-full justify-start"
                                variant={r.href === pathname ? "secondary" : "ghost"}
                            >
                                {r.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((r, i) => (
                <NavButton
                    key={i}
                    href={r.href}
                    label={r.label}
                    isActive={pathname === r.href}
                />
            ))}
            
        </nav>
    )
}