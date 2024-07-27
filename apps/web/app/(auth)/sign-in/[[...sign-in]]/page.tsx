import {
    SignIn,
    ClerkLoaded,
    ClerkLoading
} from "@clerk/nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Page() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <section className="h-full flex flex-col mx-auto my-auto items-center justify-center px-4">
                <article className="text-center">
                <ClerkLoaded>
                    <SignIn />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </ClerkLoading>
                </article>
            </section>
            <section className="h-full bg-teal-600 hidden lg:flex items-center justify-center">
                <Image
                    src="/logo.svg"
                    width={250}
                    height={250}
                    alt="App Logo"
                />
            </section>
        </main>
    );
}