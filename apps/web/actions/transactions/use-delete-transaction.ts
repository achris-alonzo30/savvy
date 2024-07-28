import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const res = await client.api.transactions[":id"]["$delete"]({ param: { id }});
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Transaction deleted",
                description: "Transaction deleted successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate Summary and Transactions
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete transaction.",
                variant: "destructive" 
            })
        }
    });

    return mutation;
}