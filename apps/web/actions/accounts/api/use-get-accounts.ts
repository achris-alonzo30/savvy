import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const res = await client.api.accounts.$get();

            // You need to handle errors
            if (!res.ok) throw new Error("[useGetAccounts]: Failed to fetch accounts");

            const { data } = await res.json();

            return data;
        }
    });

    return query;
}