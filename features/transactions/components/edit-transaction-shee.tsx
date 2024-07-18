"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { TransactionForm } from "./transaction-form";
import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useGetTransaction } from "../api/use-get-transaction";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateaAccount } from "@/features/accounts/api/use-create-accounts";


export const EditTransactionSheet = () => {


  const formSchema = insertTransactionSchema.omit({
    id: true
  })
  type FormValues = z.infer<typeof formSchema>


  const { isOpen, onClose, id } = useOpenTransaction();
  const transactionQuery = useGetTransaction(id)

  const editMutation = useEditTransaction(id)
  const deleteMutation = useDeleteTransaction(id)

  const categoryQuery = useGetCategories()
  const categoryMutation = useCreateCategory()
  const onCreateCategory = (name: string) => categoryMutation.mutate({
    name
  })

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id
  }))

  const accountQuery = useGetAccounts()
  const acccountMutation = useCreateaAccount()
  const onCreateAccount = (name: string) => acccountMutation.mutate({
    name
  })

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }))


  const isPending = editMutation.isPending || deleteMutation.isPending || transactionQuery.isLoading || categoryMutation.isPending || acccountMutation.isPending

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading || transactionQuery.isLoading

  const [ConfirmDailog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this  transaction"
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

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date
      ? new Date(transactionQuery.data.date)
      : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes,

  } : {
    accountId: "",
    categoryId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: ""
  }

  return (
    <>
      <ConfirmDailog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Transaction
            </SheetTitle>
            <SheetDescription>
              Edit an existing transaction
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            // pass id so that it also gives the delete button
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              defaultValues={defaultValues}
            />
          )}

        </SheetContent>
      </Sheet>
    </>
  )
}