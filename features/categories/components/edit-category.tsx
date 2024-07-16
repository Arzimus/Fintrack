"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "../api/use-create-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";


export const EditCategorySheet = () => {


  const formSchema = insertCategorySchema.pick({
    name: true
  })
  type FormValues = z.infer<typeof formSchema>


  const { isOpen, onClose, id } = useOpenCategory();
  const categoryQuery = useGetCategory(id)
  const isLoading = categoryQuery.isLoading;
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)


  const isPending = editMutation.isPending || deleteMutation.isPending

  const [ConfirmDailog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete a category"
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

  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name
  } : { name: "" }

  return (
    <>
      <ConfirmDailog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Category
            </SheetTitle>
            <SheetDescription>
              Edit an existing category
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            // pass id so that it also gives the delete button
            <CategoryForm
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