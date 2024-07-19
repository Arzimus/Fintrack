
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"


const dateFromat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd"

const requiredOptions = ["amount", "date", "payee"]

type Props = {
  data: string[]
  onCancel: () => void
  onSubmit: (data: any) => void
}

interface SelectedColumnState {
  [key: string]: string | null
}

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({})
  const headers = data[0]
  const body = data.slice(1)

  return (
    <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row
        lg:items-center lg:justify-between
        ">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    </div>
  )
}

export default ImportCard
