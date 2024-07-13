"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/use-new-account"
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateaAccount } from "../api/use-create-accounts";


export const NewAccountSheet = () => {

  const { isOpen, onClose } = useNewAccount();

  const formSchema = insertAccountSchema.pick({
    name: true
  })

  const mutation = useCreateaAccount();

  type FormValues = z.infer<typeof formSchema>

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

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
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}
          defaultValues={{
            name: ""
          }}
        />
      </SheetContent>
    </Sheet>
  )
}