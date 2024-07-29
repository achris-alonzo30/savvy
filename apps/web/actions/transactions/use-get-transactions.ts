import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmtFromMilUnits } from "@/lib/utils";

export const useGetTransactions = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        // TODO: Check if params are needed in the key
        queryKey: ["transactions", { from, to, accountId }],
        queryFn: async () => {
            const res = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            // You need to handle errors
            if (!res.ok) throw new Error("Failed to fetch transactions.");

            const { data } = await res.json();

            return data.map((transation) => {
                return ({
                    ...transation,
                    amount: convertAmtFromMilUnits(transation.amount)
                })
            })
        }
    });

    return query;
}