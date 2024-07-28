import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.transactions[":id"]["$patch"]({  param: { id }, json  });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Transaction updated",
                description: "Transaction updated successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate Summary
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update transaction.",
                variant: "destructive"
            })
        }
    });

    return mutation;
}