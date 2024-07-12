import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { InferRequestType } from "hono";



type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

