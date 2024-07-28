import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.transactions["bulk-delete"]["$post"]({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Transactions deleted",
                description: "Transactions deleted successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate Summary
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