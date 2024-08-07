"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateaAccount } from "../api/use-create-accounts";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";


export const EditAccountSheet = () => {


  const formSchema = insertAccountSchema.pick({
    name: true
  })
  type FormValues = z.infer<typeof formSchema>


  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetAccount(id)
  const isLoading = accountQuery.isLoading;
  const editMutation = useEditAccount(id)
  const deleteMutation = useDeleteAccount(id)


  const isPending = editMutation.isPending || deleteMutation.isPending

  const [ConfirmDailog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete a account"
  )


  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : { name: "" }

  return (
    <>
      <ConfirmDailog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Account
            </SheetTitle>
            <SheetDescription>
              Edit an existing account
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            // pass id so that it also gives the delete button
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}

        </SheetContent>
      </Sheet>
    </>
  )
}