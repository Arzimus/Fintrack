"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateaAccount } from "../api/use-create-accounts";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";


export const EditAccountSheet = () => {


  const formSchema = insertAccountSchema.pick({
    name: true
  })
  type FormValues = z.infer<typeof formSchema>

  const mutation = useCreateaAccount();

  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetAccount(id)
  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }


  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : { name: "" }

  return (

    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            New Account
          </SheetTitle>
          <SheetDescription>
            Create a new Account to track your transactions
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        )}

      </SheetContent>
    </Sheet>
  )
}