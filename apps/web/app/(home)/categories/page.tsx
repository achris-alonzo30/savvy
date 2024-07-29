"use client";

import { categoryColumns } from "./category-columns";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { LoadingScreen } from "./loading-screen";
import { DataTable } from "@/components/data-table";
import { useGetCategories } from "@/actions/categories/use-get-categories";
import { NewCategorySheet } from "@/components/categories/new-category-sheet";
import { useBulkDeleteCategories } from "@/actions/categories/use-bulk-delete-categories";

const CategoryPage = () => {
    const categoriesQuery = useGetCategories();
    const deleteCategories = useBulkDeleteCategories();

    const categories = categoriesQuery.data || [];
    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

    if (categoriesQuery.isLoading) return <LoadingScreen />;

    return (
        <main className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories
                    </CardTitle>
                    <NewCategorySheet />
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={categories}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteCategories.mutate({ ids });
                        }}
                        disabled={isDisabled}
                        columns={categoryColumns}
                    />
                </CardContent>
            </Card>
        </main>
    )
}

export default CategoryPage;