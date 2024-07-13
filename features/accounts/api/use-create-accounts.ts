import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { InferRequestType } from "hono";
import { toast } from "sonner";


// InferResponseType<typeof client.api.accounts.$post> extracts the type of the response returned by the $post method of the accounts endpoint on the client.
// InferResponseType is a utility type that infers the resolved value type of a Promise.

type ResponseType = InferResponseType<typeof client.api.accounts.$post>

// This accesses the json property of the inferred request type. It implies that the request object has a structure where the body of the request is under a json key.

type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]


export const useCreateaAccount = () => {

  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Account created")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: () => {
      toast.error("Failed to create account ")
    }

  })
  return mutation;
}
