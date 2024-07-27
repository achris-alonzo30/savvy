"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
    const { user, isLoaded } = useUser();
    return (
        <nav className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-zinc-50 capitalize font-medium">
                Welcome Back{isLoaded && user ? `, ${user.firstName} 👋` : ""}
            </h2>
            <p className="text-sm lg-text-base text-teal-">
                This is your Financial Overview Report.
            </p>
        </nav>
    )
}