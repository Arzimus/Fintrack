import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { InferRequestType } from "hono";
import { toast } from "sonner";


// InferResponseType<typeof client.api.accounts.$post> extracts the type of the response returned by the $post method of the accounts endpoint on the client.
// InferResponseType is a utility type that infers the resolved value type of a Promise.

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>

// This accesses the json property of the inferred request type. It implies that the request object has a structure where the body of the request is under a json key.

type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]


export const useEditCategory = (id?: string) => {

  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({
        json,
        param: { id }
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Category updated")
      // refetch on successfull creation of account
      queryClient.invalidateQueries({ queryKey: ["category", { id }] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })

    },
    onError: () => {
      toast.error("Failed to edit category ")
    }

  })
  return mutation;
}
