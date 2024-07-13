"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { Plus } from "lucide-react"
import { Payment, cloumns } from "./column"
import { DataTable } from "@/components/DataTable"


const Accounts = () => {
  const newAccount = useNewAccount()

  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "a@example.com",
    },
  ]
  return (
    <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row
        lg:items-center lg:justify-between
        ">
          <CardTitle className="text-xl line-clamp-1">
            Accounts page
          </CardTitle>
          <Button size="sm"
            onClick={newAccount.onOpen}
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={cloumns}
            data={data}
            filterKey="email"
            onDelete={() => { }}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Accounts
