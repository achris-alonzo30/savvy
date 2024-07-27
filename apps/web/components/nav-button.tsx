"use client";

import Link from "next/link";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";

export const NavButton = ({
    href,
    label,
    isActive
}: {
    href: string;
    label: string;
    isActive?: boolean;
}) => {
    return (
        <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(
                "w-full lg:w-auto rounded-md py-1 justify-between font-normal hover:bg-white/20  border-none focus-visible:ring-offset-0 focus-visible:ring-tranparent outline-none text-zinc-50 focus:bg-white/30 transition-colors",
                isActive ? "bg-white/10 text-zinc-50" : "bg-transparent"
            )}
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}