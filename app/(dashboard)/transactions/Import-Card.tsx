
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { ImportTable } from "./import-table"
import { convertAmountFromMiliunits, convertAmountToMiliunits } from "@/lib/utils"
import { format, parse } from "date-fns"


const dateFromat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd"

const requiredOptions = ["amount", "date", "payee"]

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

// represents an index signature of an obeject here it means it can take any no 
// of properties 
interface SelectedColumnState {
  [key: string]: string | null
}

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({})
  const headers = data[0]
  const body = data.slice(1)

  const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev }
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null
        }
      }
      if (value === 'skip') {
        value = null
      }
      newSelectedColumns[`column_${columnIndex}`] = value
      return newSelectedColumns
    })
  }
  // object.values return an array of  values of the object only values not the key then are fileterd by only true values 
  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1]
    }
    const mappedData = {
      headers: headers.map((header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`)
        return selectedColumns[`column_${columnIndex}`] || null
      }),
      body: body.map((row) => {
        const transformedRow = row.map((cell, index) => {
          const columnIndex = getColumnIndex(`column_${index}`)
          return selectedColumns[`column_${columnIndex}`] ? cell : null
        })
        return transformedRow.every(item => item === null) ? [] : transformedRow
      }).filter((row) => row.length > 0)
    }
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index]
        if (header !== null) {
          acc[header] = cell
        }
        return acc
      }, {})
    })

    const formatedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFromat, new Date()), outputFormat)
    }))

    onSubmit(formatedData)
  }

  return (
    <div className="max-w-screen-2xl w-full mx-auto pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row
        lg:items-center lg:justify-between
        ">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2">
            <Button
              size="sm"
              onClick={onCancel}
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              size='sm'
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumn={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default ImportCard
