import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const res = await client.api.accounts[":id"]["$delete"]({ param: { id }});
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Account deleted",
                description: "Account deleted successfully",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["account", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            // TODO: Invalidate Summary and Transactions
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete account",
                variant: "destructive"
            })
        }
    });

    return mutation;
}