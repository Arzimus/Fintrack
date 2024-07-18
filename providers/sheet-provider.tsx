"use client"

import { EditAccountSheet } from "@/features/accounts/components/edit-account"
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { EditCategorySheet } from "@/features/categories/components/edit-category"
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-shee"
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet"
import { useMountedState } from "react-use"


export const SheetProvider = () => {

  const isMounted = useMountedState()
  // it has useeffect under the hood which set the ismounted true and useeffext only runs 
  // when the component is rendered on the client

  if (!isMounted) return null
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  )
}