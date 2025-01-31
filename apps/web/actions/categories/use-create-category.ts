import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.categories.$post({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Category created",
                description: "Category created successfully.",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create category.",
                variant: "destructive"
            })
        }
    });

    return mutation;
}