import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.categories["bulk-delete"]["$post"]({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Categories deleted",
                description: "Categories deleted successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Invalidate Summary
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete categories.",
                variant: "destructive"
            })
        }
    });

    return mutation;
}