import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "@/components/ui/use-toast";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.accounts.$post({ json });
            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Account created",
                description: "Account created successfully",
                variant: "default"
            })
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create account",
                variant: "destructive"
            })
        }
    });

    return mutation;
}