"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"
import { cloumns } from "./column"
import { DataTable } from "@/components/DataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"
import { useState } from "react"
import { UploadButton } from "./upload-button"
import ImportCard from "./Import-Card"

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: [],
}

const Transactions = () => {

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)


  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results)
    setVariant(VARIANTS.IMPORT)
  }

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []
  const deleteTransactions = useBulkDeleteTransactions()

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

  if (transactionsQuery.isLoading) {
    return (
      <div>
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center ">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <div>
          <ImportCard
            data={importResults.data}
            onSubmit={() => { }}
            onCancel={onCancelImport}
          />
        </div>
      </>
    )
  }
  return (
    <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row
        lg:items-center lg:justify-between
        ">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button size="sm"
              onClick={newTransaction.onOpen}
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={cloumns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteTransactions.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Transactions
