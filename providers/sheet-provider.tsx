"use client"

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { useMountedState } from "react-use"


export const SheetProvider = () => {

  const isMounted = useMountedState()
  // it has useeffect under the hood which set the ismounted true and useeffext only runs 
  // when the component is rendered on the client

  if (!isMounted) return null
  return (
    <NewAccountSheet />
  )
}