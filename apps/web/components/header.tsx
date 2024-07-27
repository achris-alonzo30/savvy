
import {
    UserButton,
    ClerkLoaded,
    ClerkLoading,
} from "@clerk/nextjs";

import { Loader2 } from "lucide-react";

import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { WelcomeMsg } from "./welcome-msg";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-teal-700 to-teal-500 px-4 py-8 lg:px-14 pb-36">
            <section className="max-w-screen-2xl mx-auto">
                <nav className="w-full flex items-center justify-between mb-14">
                    <aside className="flex items-center lg:gap-x-16">
                        <Logo />
                        <Navigation />
                    </aside>
                    <ClerkLoaded>
                        <UserButton afterSwitchSessionUrl="/" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 text-zinc-50 animate-spin" />
                    </ClerkLoading>
                </nav>
                <WelcomeMsg />
            </section>
        </header>
    )
}