import { insertAccountSchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";



const formSchema = insertAccountSchema.pick({
  name: true
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  id?: string,
  defaultValues?: FormValues,
  onSubmit: (values: FormValues) => void,
  onDelete?: () => void,
  disabled: boolean
}

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled
}: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Cash,Bank,Credit Card "
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Account"}
        </Button>
        {/* had to give the button a type of button because in the form it will act as submit */}
        {!!id && (<Button type="button"
          disabled={disabled}
          onClick={handleDelete}
          className="w-full"
          variant="outline"
        >
          <Trash className="size-4 mr-2" />
          Delete Account
        </Button>)}
      </form>
    </Form>
  )
}