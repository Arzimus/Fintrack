"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"
import { useConfirm } from "@/hooks/use-confirm"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {

  const [ConfirmDailog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete a account"
  )
  const { onOpen } = useOpenAccount()

  const deleteMutation = useDeleteAccount(id)

  const handleDelete = async () => {

    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate()
    }
  }


  return (
    <>
      <ConfirmDailog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}