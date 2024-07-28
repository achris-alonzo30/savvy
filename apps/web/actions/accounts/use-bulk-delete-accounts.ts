import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.accounts["bulk-delete"]["$post"]({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Account deleted",
                description: "Account deleted successfully",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            // TODO: Invalidate Summary
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