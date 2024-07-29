import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingScreen = () => {
    return (
        <main className="max-w-screen-2xl flex flex-col w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between mt-4 w-full">
                    <Skeleton className="h-10 w-full md:w-48 mb-2 md:mb-0" />
                    <Skeleton className="h-10 w-full md:w-48 mb-2 md:mb-0" />
                </CardHeader>
                <CardContent className="flex flex-col gap-4 lg:gap-6">
                    <Skeleton className="h-10 w-full md:w-[350px] mt-4" />
                    <Skeleton className="h-[250px] w-full flex items-center mx-auto justify-center" />
                    <aside className="flex flex-col md:flex-row items-center justify-between mt-4 w-full">
                        <Skeleton className="h-10 w-full md:w-20" />
                        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                            <Skeleton className="h-10 w-full md:w-20 mb-2 md:mb-0" />
                            <Skeleton className="h-10 w-full md:w-20 mb-2 md:mb-0" />
                        </div>
                    </aside>
                </CardContent>
            </Card>
        </main>
    )
}