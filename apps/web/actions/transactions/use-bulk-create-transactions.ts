import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransactions = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.transactions["bulk-create"]["$post"]({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Transaction created",
                description: "Transaction created successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate Summary and Transactions
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create transaction.",
                variant: "destructive" 
            })
        }
    });

    return mutation;
}