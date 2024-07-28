import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.categories[":id"]["$patch"]({  json, param: { id } });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Category updated",
                description: "Category updated successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Invalidate Summary and Transactions
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update category.",
                variant: "destructive"
            })
        }
    });

    return mutation;
}