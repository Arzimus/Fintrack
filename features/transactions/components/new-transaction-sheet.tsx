"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewTransaction } from "../hooks/use-new-transaction"

import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateaAccount } from "@/features/accounts/api/use-create-accounts";
import { TransactionForm } from "./transaction-form";
import { Dice1, Loader2 } from "lucide-react";


export const NewTransactionSheet = () => {

  const { isOpen, onClose } = useNewTransaction();

  const formSchema = insertTransactionSchema.omit({
    id: true
  })
  type FormValues = z.infer<typeof formSchema>

  const createMutation = useCreateTransaction();

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

  const isPending = createMutation.isPending || categoryMutation.isPending || acccountMutation.isPending

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  return (

    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
        <SheetHeader>
          <SheetTitle>
            New Transaction
          </SheetTitle>
          <SheetDescription>
            Add a new transaction
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0-flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}

      </SheetContent>
    </Sheet>
  )
}