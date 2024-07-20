import { Select } from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCreateaAccount } from "@/features/accounts/api/use-create-accounts";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useRef, useState } from "react"


export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateaAccount()
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  })

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }))



  const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);


  //useref because it wont re-render the dailog-box on every keystroke unlike if we used usesttate  
  const selectValue = useRef<string>()

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({ resolve })
  })

  const handleClose = () => {
    setPromise(null)
  }
  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
  }
  const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose()
  }

  const ConfirmationDailog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Select Account
          </DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => selectValue.current = value}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDailog, confirm]
}