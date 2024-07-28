import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const res = await client.api.categories[":id"]["$delete"]({ param: { id }});
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Category deleted",
                description: "Category deleted successfully",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Invalidate Summary and Transactions
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete category",
                variant: "destructive"
            })
        }
    });

    return mutation;
}