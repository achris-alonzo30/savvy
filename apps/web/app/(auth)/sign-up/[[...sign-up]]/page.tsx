import {
  SignUp,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <section className="h-full lg:flex flex-col items-center justify-center px-4">
          <ClerkLoaded>
            <SignUp />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </ClerkLoading>
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
    </div>
  );
}