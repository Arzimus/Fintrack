import { client } from "@/lib/hono"
import { convertAmountFromMiliunits } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    // only if id available
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({
        param: { id }
      })

      if (!res.ok) {
        throw new Error("Failed to fetch individual transaction")
      }
      const { data } = await res.json()
      return { ...data, amount: convertAmountFromMiliunits(data.amount) };
    }
  })

  return query
}