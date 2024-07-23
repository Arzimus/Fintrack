import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { InferRequestType } from "hono";
import { toast } from "sonner";


// InferResponseType<typeof client.api.accounts.$post> extracts the type of the response returned by the $post method of the accounts endpoint on the client.
// InferResponseType is a utility type that infers the resolved value type of a Promise.

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>

// This accesses the json property of the inferred request type. It implies that the request object has a structure where the body of the request is under a json key.




export const useDeleteTransaction = (id?: string) => {

  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id }
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Transaction deleted")
      // refetch on successfull creation of account
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })

    },
    onError: () => {
      toast.error("Failed to delete transaction ")
    }

  })
  return mutation;
}
